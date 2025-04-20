import { PayPalScriptOptions } from "@paypal/react-paypal-js"

export const paypalInitialOptions: PayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "USD",
  intent: "capture",
}

export const paypal = {
  createOrder: async (orderData: any) => {
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: orderData.purchase_units,
        application_context: orderData.application_context,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create PayPal order")
    }

    const data = await response.json()
    return data
  },
  
  captureOrder: async (orderId: string) => {
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to capture PayPal order")
    }

    return response.json()
  }
}
