"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  topic: z.string().min(5, {
    message: "Topic must be at least 5 characters.",
  }),
  area: z.string({
    required_error: "Please select an area.",
  }),
  goals: z.string().min(10, {
    message: "Goals must be at least 10 characters.",
  }),
  preferredDays: z.array(z.string()).min(1, {
    message: "Please select at least one preferred day.",
  }),
  preferredTimes: z.array(z.string()).min(1, {
    message: "Please select at least one preferred time.",
  }),
  message: z.string().optional(),
  preferVirtual: z.boolean().optional(),
})

const weekdays = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
]

const timeSlots = [
  { id: "morning", label: "Morning (9am - 12pm)" },
  { id: "afternoon", label: "Afternoon (12pm - 5pm)" },
  { id: "evening", label: "Evening (5pm - 9pm)" },
]

export function MentorshipRequestForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      area: "",
      goals: "",
      preferredDays: [],
      preferredTimes: [],
      message: "",
      preferVirtual: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Mentorship request submitted!",
        description: "We'll connect you with a mentor soon.",
      })

      form.reset()
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="topic">Mentorship Topic</Label>
        <Input id="topic" placeholder="E.g., Career guidance in software development" {...form.register("topic")} />
        <p className="text-sm text-muted-foreground">
          A clear, specific topic helps us match you with the right mentor.
        </p>
        {form.formState.errors.topic && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.topic.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="area">Area of Interest</Label>
        <Select onValueChange={(value) => form.setValue("area", value)} defaultValue={form.getValues("area")}>
          <SelectTrigger id="area">
            <SelectValue placeholder="Select an area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.area && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.area.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals">Your Goals</Label>
        <Textarea
          id="goals"
          placeholder="What do you hope to achieve through mentorship?"
          {...form.register("goals")}
        />
        {form.formState.errors.goals && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.goals.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Preferred Days</Label>
        <div className="grid grid-cols-2 gap-2">
          {weekdays.map((day) => (
            <div key={day.id} className="flex items-center space-x-2">
              <Checkbox
                id={day.id}
                checked={form.watch("preferredDays").includes(day.id)}
                onCheckedChange={(checked) => {
                  const current = form.getValues("preferredDays")
                  if (checked) {
                    form.setValue("preferredDays", [...current, day.id])
                  } else {
                    form.setValue(
                      "preferredDays",
                      current.filter((d) => d !== day.id),
                    )
                  }
                }}
              />
              <Label htmlFor={day.id} className="font-normal">
                {day.label}
              </Label>
            </div>
          ))}
        </div>
        {form.formState.errors.preferredDays && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.preferredDays.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Preferred Times</Label>
        <div className="grid grid-cols-1 gap-2">
          {timeSlots.map((slot) => (
            <div key={slot.id} className="flex items-center space-x-2">
              <Checkbox
                id={slot.id}
                checked={form.watch("preferredTimes").includes(slot.id)}
                onCheckedChange={(checked) => {
                  const current = form.getValues("preferredTimes")
                  if (checked) {
                    form.setValue("preferredTimes", [...current, slot.id])
                  } else {
                    form.setValue(
                      "preferredTimes",
                      current.filter((t) => t !== slot.id),
                    )
                  }
                }}
              />
              <Label htmlFor={slot.id} className="font-normal">
                {slot.label}
              </Label>
            </div>
          ))}
        </div>
        {form.formState.errors.preferredTimes && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.preferredTimes.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Message (Optional)</Label>
        <Textarea
          id="message"
          placeholder="Any additional information you'd like to share with your mentor"
          {...form.register("message")}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="preferVirtual"
          checked={form.watch("preferVirtual")}
          onCheckedChange={(checked) => form.setValue("preferVirtual", checked as boolean)}
        />
        <Label htmlFor="preferVirtual" className="font-normal">
          I prefer virtual mentoring sessions
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting Request..." : "Submit Mentorship Request"}
      </Button>
    </form>
  )
}
