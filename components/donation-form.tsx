"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Building, School, GraduationCap, Users } from "lucide-react"
import { Label } from "@/components/ui/label"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { paypalInitialOptions } from "@/lib/paypal"
import { useSession } from "next-auth/react"

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Amount is required.",
  }),
  donationType: z.enum(["oneTime", "monthly", "yearly"]),
  fundType: z.enum(["general", "scholarship", "infrastructure", "events"]),
  message: z.string().optional(),
})

export function DonationForm() {
  const { toast } = useToast()
  const { data: session } = useSession()
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "50",
      donationType: "oneTime",
      fundType: "general",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step === 1) {
      setStep(2)
      return
    }
  }

  const fundTypeIcons = {
    general: Building,
    scholarship: GraduationCap,
    infrastructure: School,
    events: Users,
  }

  const createOrder = async () => {
    if (!session?.user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to make a donation.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      const amount = Number.parseFloat(form.getValues("amount"))

      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          donationType: form.getValues("donationType"),
          fundType: form.getValues("fundType"),
          message: form.getValues("message"),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      return data.id
    } catch (error) {
      console.error("Error creating order:", error)
      toast({
        title: "Error",
        description: "Failed to create payment. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setIsProcessing(false)
    }
  }

  const onApprove = async (data: { orderID: string }) => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to capture order")
      }

      toast({
        title: "Donation successful!",
        description: `Thank you for your ${form.getValues("donationType") === "oneTime" ? "one-time" : form.getValues("donationType")} donation of INR:${form.getValues("amount")}.`,
      })

      form.reset()
      setStep(1)
    } catch (error) {
      console.error("Error capturing order:", error)
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <PayPalScriptProvider options={paypalInitialOptions}>
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-4">
                  {["25", "50", "100", "250"].map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={form.getValues("amount") === amount ? "default" : "outline"}
                      onClick={() => form.setValue("amount", amount)}
                      className={
                        form.getValues("amount") === amount
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                          : "border-purple-300 hover:border-purple-400 hover:bg-purple-50"
                      }
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-purple-800 dark:text-purple-300">
                    Custom Amount
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-purple-500" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      className="pl-9 bg-white/50 dark:bg-white/10 border-purple-300 focus-visible:ring-purple-500"
                      {...form.register("amount")}
                    />
                  </div>
                  {form.formState.errors.amount && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.amount.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-purple-800 dark:text-purple-300">Donation Frequency</Label>
                  <RadioGroup
                    onValueChange={(value) => form.setValue("donationType", value as "oneTime" | "monthly" | "yearly")}
                    defaultValue={form.getValues("donationType")}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="oneTime" id="oneTime" className="border-purple-400 text-purple-600" />
                      <Label htmlFor="oneTime" className="font-normal">
                        One-time donation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="monthly" id="monthly" className="border-purple-400 text-purple-600" />
                      <Label htmlFor="monthly" className="font-normal">
                        Monthly donation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="yearly" id="yearly" className="border-purple-400 text-purple-600" />
                      <Label htmlFor="yearly" className="font-normal">
                        Yearly donation
                      </Label>
                    </div>
                  </RadioGroup>
                  {form.formState.errors.donationType && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.donationType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-purple-800 dark:text-purple-300">Fund Designation</Label>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Choose where you would like your donation to go
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {(["general", "scholarship", "infrastructure", "events"] as const).map((type) => {
                      const Icon = fundTypeIcons[type]
                      return (
                        <Card
                          key={type}
                          className={`cursor-pointer transition-colors ${
                            form.getValues("fundType") === type
                              ? "border-purple-500 bg-purple-100 dark:bg-purple-900/30"
                              : "bg-white/70 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-900/10"
                          }`}
                          onClick={() => form.setValue("fundType", type)}
                        >
                          <CardContent className="pt-6 text-center">
                            <Icon
                              className={`mx-auto h-8 w-8 ${form.getValues("fundType") === type ? "text-purple-600" : "text-purple-400"}`}
                            />
                            <p className="mt-2 font-medium capitalize text-purple-800 dark:text-purple-300">
                              {type === "general" ? "General Fund" : type}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                  {form.formState.errors.fundType && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.fundType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-purple-800 dark:text-purple-300">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Share why you're donating or any special instructions"
                    {...form.register("message")}
                    className="bg-white/50 dark:bg-white/10 border-purple-300 focus-visible:ring-purple-500"
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.message.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Continue to Payment
              </Button>
            </>
          ) : (
            <>
              <div className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 bg-white/70 dark:bg-white/5">
                <h3 className="font-medium text-purple-800 dark:text-purple-300">Donation Summary</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-purple-600 dark:text-purple-400">Amount:</span>
                    <span className="font-medium">${form.watch("amount")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600 dark:text-purple-400">Frequency:</span>
                    <span className="capitalize font-medium">
                      {form.watch("donationType") === "oneTime" ? "One-time" : form.watch("donationType")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600 dark:text-purple-400">Fund:</span>
                    <span className="capitalize font-medium">{form.watch("fundType")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center text-sm text-purple-600 dark:text-purple-400 mb-2">
                  Complete your donation securely with PayPal
                </div>

                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "pill",
                    label: "donate",
                  }}
                  disabled={isProcessing}
                  forceReRender={[form.watch("amount")]}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-purple-300 hover:border-purple-400 hover:bg-purple-50"
                  onClick={() => setStep(1)}
                  disabled={isProcessing}
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </PayPalScriptProvider>
  )
}
