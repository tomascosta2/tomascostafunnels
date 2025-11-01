"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Progress } from "./ui/progress"
import { ArrowLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  nombre: string
  telefono: string
  correo: string
  instagram: string
  // NUEVO: rol (Coach / Infoproductor / Otro)
  rol: string
  facturacion: string
  tiempoNegocio: string
  quienHizoPagina: string
  quienGestionaMarketing: string
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    telefono: "",
    correo: "",
    instagram: "",
    rol: "",
    facturacion: "",
    tiempoNegocio: "",
    quienHizoPagina: "",
    quienGestionaMarketing: "",
  })
  const [test, setTest] = useState("");

  const totalSteps = 7
  const progress = (currentStep / totalSteps) * 100

  useEffect(() => {
    try {
      const saved = localStorage.getItem("test") ?? ""
      setTest(saved)
    } catch { }
  }, [])

  console.log('TEST', test)
  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((p) => p + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((p) => p - 1)
  }

  // === Calificación (solo booleano en cache) ===
  const isQualified = useMemo(() => {
    const isCoachOrInfopro =
      formData.rol === "Coach" || formData.rol === "Infoproductor"

    const ingresosOk = [
      "1200 - 5000 usd / mes",
      "5000 - 10k usd / mes",
      "+10k usd / mes",
    ].includes(formData.facturacion)

    return isCoachOrInfopro && ingresosOk
  }, [formData.rol, formData.facturacion])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const payload = {
      ...formData,
      test
    }

    try {
      // 1) Enviar a Make (tu webhook actual)
      const webhookUrl = "https://hook.us2.make.com/6x87i3dqt339j40cdxttqmmdx2gqnfu7"
      const makeRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!makeRes.ok) {
        console.log("Error al enviar el formulario. Por favor intenta de nuevo.")
        return
      }

      // 2) Guardar SOLO el booleano de calificación en cache (sin PII)
      try {
        localStorage.setItem("cf_isQualified", isQualified ? "true" : "false")
        localStorage.setItem("name", formData.nombre)
        localStorage.setItem("email", formData.correo)
        localStorage.setItem("phone", formData.telefono)
        // (opcional) timestamp para depurar/expirar:
        // localStorage.setItem("cf_isQualified_ts", String(Date.now()))

        window.location.href = `/pages/calendly?email=${encodeURIComponent(formData.correo)}&phone=${encodeURIComponent(formData.telefono)}`

      } catch (e) {
        console.warn("No se pudo escribir cf_isQualified en localStorage:", e)
      }

      console.log("¡Formulario enviado exitosamente!")
      // Reset
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        instagram: "",
        rol: "",
        facturacion: "",
        tiempoNegocio: "",
        quienHizoPagina: "",
        quienGestionaMarketing: "",
      })
      setCurrentStep(1)


    } catch (error) {
      console.error("Error:", error)
      alert("Error al enviar el formulario. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{7,15}$/;

        const emailValido = emailRegex.test(formData.correo.trim());
        const telefonoValido = phoneRegex.test(formData.telefono.trim());

        return (
          formData.nombre.trim() !== "" &&
          emailValido &&
          telefonoValido
        );
      }
      case 2:
        return formData.instagram.trim() !== "";
      case 3:
        return formData.rol !== "";
      case 4:
        return formData.facturacion !== "";
      case 5:
        return formData.tiempoNegocio !== "";
      case 6:
        return formData.quienHizoPagina !== "";
      case 7:
        return formData.quienGestionaMarketing !== "";
      default:
        return false;
    }
  }

  return (
    <div className="w-full max-w-[500px] mx-auto border-white/20 relative overflow-clip border p-[6px] rounded-[24px]">
      <div className="bg-[#0B1D42] rounded-[16px] overflow-clip relative">
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-[#]" />
        </div>

        <div className="p-8">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 text-white/60 hover:text-white transition-colors"
              aria-label="Volver"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {/* <img className="mx-auto mb-8" src="/images/tomascosta-logo.svg" alt="Tomás Costa Funnels" /> */}

          <div className="min-h-[300px]">
            {/* Paso 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">1* Tu información</h2>
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

                {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo.trim()) && formData.correo && (
                  <p className="text-red-400 text-sm mt-2">Correo inválido</p>
                )}
                {!/^\+?\d{7,15}$/.test(formData.telefono.trim()) && formData.telefono && (
                  <p className="text-red-400 text-sm mt-2">Teléfono inválido (usa formato +549261XXXXXXX)</p>
                )}
              </div>
            )}

            {/* Paso 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">2* Tu usuario de instagram</h2>
                <Input
                  type="text"
                  placeholder="@..."
                  value={formData.instagram}
                  onChange={(e) => updateFormData("instagram", e.target.value)}
                  className="bg-white text-black border-0 h-12"
                />
              </div>
            )}

            {/* Paso 3 (NUEVO): Rol */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">
                  3* ¿Cuál describe mejor tu rol?
                </h2>
                <div className="space-y-3">
                  {["Coach", "Infoproductor", "Otro"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFormData("rol", option)
                        setTimeout(handleNext, 300)
                      }}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        formData.rol === option
                          ? "bg-[#2563eb] border-[#2563eb] text-white"
                          : "bg-transparent border-white/20 text-white hover:border-[#2563eb]",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                            formData.rol === option ? "bg-white border-white" : "border-white/40",
                          )}
                        >
                          {formData.rol === option && <div className="w-3 h-3 bg-[#2563eb] rounded-sm" />}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 4: Facturación */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">4* Facturación mensual de los últimos 6 meses</h2>
                <div className="space-y-3">
                  {[
                    "0 - 600 usd / mes",
                    "600 - 1200 usd / mes",
                    "1200 - 5000 usd / mes",
                    "5000 - 10k usd / mes",
                    "+10k usd / mes",
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
                          ? "bg-[#2563eb] border-[#2563eb] text-white"
                          : "bg-transparent border-white/20 text-white hover:border-[#2563eb]",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                            formData.facturacion === option ? "bg-white border-white" : "border-white/40",
                          )}
                        >
                          {formData.facturacion === option && <div className="w-3 h-3 bg-[#2563eb] rounded-sm" />}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 5: Tiempo con negocio */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">5* ¿Cuánto tiempo llevas con tu negocio?</h2>
                <div className="space-y-3">
                  {["Menos de 1 año", "1 - 2 años", "2 - 5 años", "Más de 5 años"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFormData("tiempoNegocio", option)
                        setTimeout(handleNext, 300)
                      }}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        formData.tiempoNegocio === option
                          ? "bg-[#2563eb] border-[#2563eb] text-white"
                          : "bg-transparent border-white/20 text-white hover:border-[#2563eb]",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                            formData.tiempoNegocio === option ? "bg-white border-white" : "border-white/40",
                          )}
                        >
                          {formData.tiempoNegocio === option && <div className="w-3 h-3 bg-[#2563eb] rounded-sm" />}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 6: Quién hizo la página */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">6* ¿Quién hizo tu página web actual?</h2>
                <div className="space-y-3">
                  {["No tengo", "Una agencia / freelancer", "Yo / Un amigo / familiar", "Alguien de mi equipo"].map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => {
                          updateFormData("quienHizoPagina", option)
                          setTimeout(handleNext, 300)
                        }}
                        className={cn(
                          "w-full p-4 rounded-lg border-2 text-left transition-all",
                          formData.quienHizoPagina === option
                            ? "bg-[#2563eb] border-[#2563eb] text-white"
                            : "bg-transparent border-white/20 text-white hover:border-[#2563eb]",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center",
                              formData.quienHizoPagina === option ? "bg-white border-white" : "border-white/40",
                            )}
                          >
                            {formData.quienHizoPagina === option && <div className="w-3 h-3 bg-[#2563eb] rounded-sm" />}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Paso 7: Gestión de Marketing */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <h2 className="text-white text-2xl font-bold mb-6">7* ¿Quién gestiona tu e-mail marketing / anuncios?</h2>
                <div className="space-y-3">
                  {["Yo mismo", "Una agencia / freelancer", "Alguien de mi equipo", "No hago ninguna de esas"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFormData("quienGestionaMarketing", option)
                        setTimeout(handleNext, 300)
                      }}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        formData.quienGestionaMarketing === option
                          ? "bg-[#2563eb] border-[#2563eb] text-white"
                          : "bg-transparent border-white/20 text-white hover:border-[#2563eb]",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                            formData.quienGestionaMarketing === option ? "bg-white border-white" : "border-white/40",
                          )}
                        >
                          {formData.quienGestionaMarketing === option && (
                            <div className="w-3 h-3 bg-[#2563eb] rounded-sm" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
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
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-12 py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-12 py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
      </div>
    </div>
  )
}
