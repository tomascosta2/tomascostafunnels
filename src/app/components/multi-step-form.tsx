"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Progress } from "./ui/progress"
import { ArrowLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  nombre: string
  telefono: string
  correo: string
  // NUEVO: reemplaza tiempoNegocio por casosExito
  rol: string
  facturacion: string
  casosExito: string
}

function getCookie(name: string): string | null {
  try {
    const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"))
    return match ? decodeURIComponent(match[2]) : null
  } catch {
    return null
  }
}

function buildFbcFromUrl(): string | null {
  try {
    const url = new URL(window.location.href)
    const fbclid = url.searchParams.get("fbclid")
    if (!fbclid) return null
    const ts = Date.now()
    return `fb.1.${ts}.${fbclid}`
  } catch {
    return null
  }
}

function getFbpFbcFromBrowser(): { fbp: string | null; fbc: string | null } {
  const fbp = getCookie("_fbp") || getCookie("__fbp") || null
  let fbc = getCookie("_fbc") || getCookie("__fbc") || null
  if (!fbc) fbc = buildFbcFromUrl()
  return { fbp, fbc }
}

interface MultiStepFormProps {
  variant: 'A' | 'B'
}

export default function MultiStepForm({ variant }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    telefono: "",
    correo: "",
    rol: "",
    facturacion: "",
    casosExito: "",
  })
  const [test, setTest] = useState("")
  const [fbp, setFbp] = useState<string | null>(null)
  const [fbc, setFbc] = useState<string | null>(null)

  // Ahora son 4 pasos
  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  useEffect(() => {
    try {
      const saved = localStorage.getItem("test") ?? ""
      setTest(saved)
    } catch { }
    const { fbp, fbc } = getFbpFbcFromBrowser()
    setFbp(fbp)
    setFbc(fbc)
  }, [])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((p) => p + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((p) => p - 1)
  }

  const isQualified = useMemo(() => {
    const isCoachFitness = formData.rol === "Coach Fitness Online"

    const ingresosOk = [
      "250 - 500 usd",
      "500 - 800 usd",
      "800 - 1.000 usd",
      "Más de 1.000 usd",
    ].includes(formData.facturacion)

    const casosExitoOk = [
      "4 - 20 casos",
      "+20 casos"
    ].includes(formData.casosExito)

    return isCoachFitness && ingresosOk && casosExitoOk
  }, [formData.rol, formData.facturacion, formData.casosExito])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const payload = { ...formData, fbp, fbc, variant }

    try {
      const webhookUrl = "https://hook.us2.make.com/6x87i3dqt339j40cdxttqmmdx2gqnfu7"
      const makeRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (isQualified) {
        fetch("/api/track/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      if (!makeRes.ok) return console.log("Error al enviar el formulario")

      localStorage.setItem("cf_isQualified", isQualified ? "true" : "false")
      localStorage.setItem("name", formData.nombre)
      localStorage.setItem("email", formData.correo)
      localStorage.setItem("phone", formData.telefono)

      window.location.href = `/pages/calendly?email=${encodeURIComponent(
        formData.correo
      )}&phone=${encodeURIComponent(formData.telefono)}`
    } catch (error) {
      console.error(error)
      alert("Error al enviar el formulario.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\+?\d{7,15}$/
        return (
          formData.nombre.trim() &&
          emailRegex.test(formData.correo.trim()) &&
          phoneRegex.test(formData.telefono.trim())
        )
      }
      case 2:
        return formData.rol !== ""
      case 3:
        return formData.facturacion !== ""
      case 4:
        return formData.casosExito !== ""
      default:
        return false
    }
  }

  return (
    <div className="w-full max-w-[500px] mx-auto border-white/20 relative overflow-clip border p-[6px] rounded-[24px]">
      <div className="bg-[#000] rounded-[16px] overflow-clip relative">
        {/* Barra de progreso: solo se muestra a partir del paso 2 */}
        {currentStep > 1 && (
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="p-8">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          <div className="min-h-[300px]">
            {/* Paso 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Sin título acá para que parezca un solo paso */}
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">Tu nombre</label>
                    <Input
                      type="text"
                      placeholder="Nombre"
                      value={formData.nombre}
                      onChange={(e) => updateFormData("nombre", e.target.value)}
                      className="bg-white text-black border-0 h-12"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">Cod. de área + Tu teléfono</label>
                    <Input
                      type="tel"
                      placeholder="Ej: +549261XXXXXXX"
                      value={formData.telefono}
                      onChange={(e) => updateFormData("telefono", e.target.value)}
                      className="bg-white text-black border-0 h-12"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">Tu mejor correo</label>
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      value={formData.correo}
                      onChange={(e) => updateFormData("correo", e.target.value)}
                      className="bg-white text-black border-0 h-12"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paso 2: Rol */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">
                  ¿Cuál describe mejor tu negocio?
                </h2>
                <div className="space-y-3">
                  {["Coach Fitness Online", "Infoproductor B2C", "Otro (No agendes)"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFormData("rol", option)
                        setTimeout(handleNext, 300)
                      }}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        formData.rol === option
                          ? "bg-[#E34716] border-[#E34716] text-white"
                          : "bg-transparent border-white/20 text-white hover:border-[#E34716]"
                      )}
                    >
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 3: Facturación */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">Valor de tu asesoria 1 a 1</h2>
                <div className="space-y-3">
                  {[
                    "Menos de 250 usd",
                    "250 - 500 usd",
                    "500 - 800 usd",
                    "800 - 1.000 usd",
                    "Más de 1.000 usd",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFormData("facturacion", option)
                        setTimeout(handleNext, 300)
                      }}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        formData.facturacion === option
                          ? "bg-[#E34716] border-[#E34716] text-white"
                          : "bg-transparent border-white/20 text-white hover:border-[#E34716]"
                      )}
                    >
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 4: Casos de Éxito */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">
                  ¿Cuántos casos de éxito tenés en tu asesoría?
                </h2>
                <div className="space-y-3">
                  {["0 casos", "1 - 3 casos", "4 - 20 casos", "+20 casos"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFormData("casosExito", option)
                      }}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        formData.casosExito === option
                          ? "bg-[#E34716] border-[#E34716] text-white"
                          : "bg-transparent border-white/20 text-white hover:border-[#E34716]"
                      )}
                    >
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botón */}
          <div className="flex justify-center mt-8">
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-[#E34716] hover:bg-[#1d4ed8] text-white px-12 w-full py-8 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="bg-[#E34716] hover:bg-[#1d4ed8] text-white px-12 py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar"
                )}
              </Button>
            )}
          </div>
            <p className="text-gray-100/60 text-[14px] px-2 leading-[100%] text-center mt-4">PD: La llamada NO es con un closer que te intenta obligar a comprar como sea.
              <br/><br/>
              Es conmigo para contestar tus dudas.</p>
        </div>
      </div>
    </div>
  )
}

