"use client"

import { useState } from "react"
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
  esProfesionalSalud: string
  facturacion: string
  tiempoNegocio: string
  quienHizoPagina: string
  quienGestionaMarketing: string
  queFalta: string
  comoAyudar: string
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    telefono: "",
    correo: "",
    instagram: "",
    esProfesionalSalud: "",
    facturacion: "",
    tiempoNegocio: "",
    quienHizoPagina: "",
    quienGestionaMarketing: "",
    queFalta: "",
    comoAyudar: "",
  })

  const totalSteps = 9
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Replace with your Make webhook URL
      const webhookUrl = "https://hook.us2.make.com/6x87i3dqt339j40cdxttqmmdx2gqnfu7"

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("¡Formulario enviado exitosamente!")
        // Reset form
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          instagram: "",
          esProfesionalSalud: "",
          facturacion: "",
          tiempoNegocio: "",
          quienHizoPagina: "",
          quienGestionaMarketing: "",
          queFalta: "",
          comoAyudar: "",
        })
        setCurrentStep(1)
      } else {
        alert("Error al enviar el formulario. Por favor intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al enviar el formulario. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.nombre.trim() !== "" && formData.correo.trim() !== ""
      case 2:
        return formData.instagram.trim() !== ""
      case 3:
        return formData.esProfesionalSalud !== ""
      case 4:
        return formData.facturacion !== ""
      case 5:
        return formData.tiempoNegocio !== ""
      case 6:
        return formData.quienHizoPagina !== ""
      case 7:
        return formData.quienGestionaMarketing !== ""
      case 8:
        return formData.queFalta.trim() !== ""
      case 9:
        return formData.comoAyudar.trim() !== ""
      default:
        return false
    }
  }

  return (
    <div className="w-full max-w-[500px] mx-auto border-white/20 relative overflow-clip border p-[6px] rounded-[24px]">
      {/* <div className="size-[900px] absolute -top-[250px] left-[calc(50%-450px)] rounded-full bg-[#0066ff] blur-[100px]"></div> */}
      {/* Form Card */}
      <div className="bg-[#0B1D42] rounded-[16px] overflow-clip relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-[#]" />
        </div>
        
        <div className="p-8">
          {/* Back Button */}
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="absolute top-6 left-6 text-white/60 hover:text-white transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}

        {/* Logo */}
        <img className="mx-auto mb-8" src="/images/tomascosta-logo.svg" alt="Tomás Costa Funnels" />

        {/* Step Content */}
        <div className="min-h-[300px]">
          {/* Step 1: Información Personal */}
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
                    type="telefono"
                    placeholder="Cod. área + Telefono"
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

          {/* Step 2: Instagram */}
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

          {/* Step 3: Profesional de Salud */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold mb-6">
                3* Sos Coach Fitness, Nutricionista, Psicólogo o algún tipo de profesional de la salud?
              </h2>
              <div className="space-y-3">
                {["Sí, lo soy", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      updateFormData("esProfesionalSalud", option)
                      setTimeout(handleNext, 300)
                    }}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all",
                      formData.esProfesionalSalud === option
                        ? "bg-[#2563eb] border-[#2563eb] text-white"
                        : "bg-transparent border-white/20 text-white hover:border-[#2563eb]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded border-2 flex items-center justify-center",
                          formData.esProfesionalSalud === option ? "bg-white border-white" : "border-white/40",
                        )}
                      >
                        {formData.esProfesionalSalud === option && <div className="w-3 h-3 bg-[#2563eb] rounded-sm" />}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Facturación */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold mb-6">4* Facturación mensual de los últimos 6 meses</h2>
              <div className="space-y-3">
                {[
                  "0 - 600usd / mes",
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

          {/* Step 5: Tiempo con Negocio */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold mb-6">5* Cuanto tiempo llevas con tu negocio</h2>
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

          {/* Step 6: Quién hizo la página */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold mb-6">6* Quien hizo tu página web actual?</h2>
              <div className="space-y-3">
                {["Yo mismo", "Una agencia / freelancer", "Un amigo / familiar", "Alguien de mi equipo"].map(
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

          {/* Step 7: Gestión de Marketing */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold mb-6">7* Quien gestiona tu e-mail marketing / anuncios?</h2>
              <div className="space-y-3">
                {["Yo mismo", "Una agencia / freelancer", "Alguien de mi equipo"].map((option) => (
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

          {/* Step 8: Qué falta */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold mb-2">
                8* Que crees que te esta faltando o esta fallando en tu embudo de ventas?
              </h2>
              <p className="text-white/60 text-sm mb-8">
                Ej. Mi página se ha quedado anticuada, no tengo una estrategia que me genere leads calificados, siento
                que me falta asesoramiento en X...
              </p>
              <Textarea
                placeholder="Escribí acá tu respuesta"
                value={formData.queFalta}
                onChange={(e) => updateFormData("queFalta", e.target.value)}
                className="bg-white text-black border-0 min-h-[120px] resize-none"
              />
            </div>
          )}

          {/* Step 9: Cómo ayudar */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold mb-2">9* Cómo crees que te puedo ayudar?</h2>
              <p className="text-white/60 text-sm mb-8">
                Ej. Quiero ofrecer un landing de calidad, tener estrategias evergreen, un VSL bien pensado, y
                automatizar procesos.
              </p>
              <Textarea
                placeholder="Escribí acá tu respuesta"
                value={formData.comoAyudar}
                onChange={(e) => updateFormData("comoAyudar", e.target.value)}
                className="bg-white text-black border-0 min-h-[120px] resize-none"
              />
            </div>
          )}
        </div>

        {/* Action Button */}
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
