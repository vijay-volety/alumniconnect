import { Award, Calendar, UserPlus, Users, Gift, MessageSquare, Clock, Zap } from "lucide-react"

export function Features() {
  const features = [
    {
      name: "Separate Logins",
      description:
        "Students and alumni get separate logins, with graduates able to seamlessly switch to an alumni account.",
      icon: UserPlus,
    },
    {
      name: "Welcome Bonus",
      description: "When you log in for the first time, you'll get bonus points to explore the gamification portal.",
      icon: Gift,
    },
    {
      name: "Gamification",
      description: "Every student starts with 100 default points to kick off their journey in the gamification portal.",
      icon: Zap,
    },
    {
      name: "Wall of Fame",
      description:
        "Alumni who contribute to events or infrastructure will be highlighted on the 'Wall of Fame' leaderboard.",
      icon: Award,
    },
    {
      name: "Busy Status",
      description: "If alumni are busy, they can toggle an 'I'm Busy' option for transparency.",
      icon: Clock,
    },
    {
      name: "Scheduling System",
      description: "Mentors can schedule calls with students and mark their busy times on the 'Busy Board'.",
      icon: Calendar,
    },
    {
      name: "Interactive Chatbot",
      description: "A chatbot will answer FAQs and help users navigate the platform with ease.",
      icon: MessageSquare,
    },
    {
      name: "Mentorship Network",
      description: "Connect with mentors from your field or become one to help others succeed.",
      icon: Users,
    },
  ]

  return (
    <div className="py-16 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Platform Features</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our platform offers a range of features designed to enhance the experience for both students and alumni.
          </p>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="rounded-xl bg-background p-6 shadow-sm border transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
