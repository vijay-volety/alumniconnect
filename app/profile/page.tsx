"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Award, Edit, Save, User, Briefcase, GraduationCap, MapPin, Mail, Phone } from "lucide-react"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"

// Mock user data
const mockUserData = {
  id: "1",
  name: "Sravanthi Akula",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=128&width=128",
  userType: "alumni",
  graduationYear: "2015",
  company: "Tech Innovations Inc.",
  position: "Senior Software Engineer",
  location: "San Francisco, CA",
  bio: "Passionate software engineer with 8 years of experience in web development. Interested in mentoring students and sharing industry insights.",
  skills: ["JavaScript", "React", "Node.js", "Python", "UI/UX Design"],
  achievements: [
    {
      id: "1",
      name: "First Login",
      description: "Completed your first login to the platform",
      icon: "gift",
      category: "Basics",
      featured: true,
      date: "2023-01-15",
    },
    {
      id: "2",
      name: "Networker",
      description: "Connected with 5 other members",
      icon: "users",
      category: "Community",
      featured: true,
      date: "2023-02-10",
    },
    {
      id: "3",
      name: "Donor",
      description: "Made your first donation",
      icon: "heart",
      category: "Contributions",
      featured: false,
      date: "2023-03-05",
    },
    {
      id: "4",
      name: "Mentor Master",
      description: "Completed 5 mentorship sessions",
      icon: "award",
      category: "Mentorship",
      featured: true,
      date: "2023-04-20",
    },
    {
      id: "5",
      name: "Event Enthusiast",
      description: "Attended 3 alumni events",
      icon: "calendar",
      category: "Events",
      featured: false,
      date: "2023-05-15",
    },
  ],
  privacy: {
    showEmail: true,
    showPhone: false,
    showCompany: true,
    profileVisibility: "public", // public, alumni, none
  },
}

interface ExtendedSession extends Session {
  user?: {
    id?: string
    name?: string
    email?: string
    userType?: string
  }
}

export default function ProfilePage() {
  const { data: session } = useSession() as { data: ExtendedSession | null }
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    avatar: "/placeholder.svg?height=128&width=128",
    userType: "student",
    graduationYear: "",
    company: "",
    position: "",
    location: "",
    bio: "",
    skills: [],
    achievements: mockUserData.achievements, // Keep mock achievements
    privacy: {
      showEmail: true,
      showPhone: false,
      showCompany: true,
      profileVisibility: "public",
    },
  })

  // Initialize formData with user session data
  // Remove this duplicate formData declaration
  // const [formData, setFormData] = useState({
  //   ...mockUserData,
  //   id: session?.user?.id || "",
  //   name: session?.user?.name || "",
  //   email: session?.user?.email || "",
  //   userType: session?.user?.userType || "student",
  // })

  useEffect(() => {
    if (session?.user?.email) {
      setUserData(prevData => ({
        ...prevData,
        id: session.user?.id || "",
        name: session.user?.name || "",
        email: session.user?.email || "",
        userType: session.user?.userType || "student",
      }))
      
      // Update formData when session changes
      setFormData(prevData => ({
        ...prevData,
        id: session.user?.id || "",
        name: session.user?.name || "",
        email: session.user?.email || "",
        userType: session.user?.userType || "student",
      }))
    }
  }, [session])

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(mockUserData)  // Keep this declaration
  const { toast } = useToast()
  const router = useRouter()

  // Function to toggle achievement featured status
  const toggleFeatured = (achievementId: string) => {
    setUserData((prevData) => {
      const updatedAchievements = prevData.achievements.map((achievement) =>
        achievement.id === achievementId ? { ...achievement, featured: !achievement.featured } : achievement,
      )

      // Show real-time update toast
      const achievement = prevData.achievements.find((a) => a.id === achievementId)
      if (achievement) {
        toast({
          title: achievement.featured ? "Achievement unfeatured" : "Achievement featured",
          description: `"${achievement.name}" will ${achievement.featured ? "no longer" : "now"} be displayed on your public profile.`,
        })
      }

      return { ...prevData, achievements: updatedAchievements }
    })
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle privacy toggle changes
  const handlePrivacyChange = (setting: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value,
      },
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setUserData(formData)
      setIsEditing(false)

      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="h-screen flex">
      <DashboardSidebar userType={userData.userType as "student" | "alumni"} />
      <SidebarInset>
        <DashboardHeader userType={userData.userType as "student" | "alumni"} />
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and privacy settings</p>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Cancel
                </Button>
              )}
            </div>

            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-32 w-32">
                              <AvatarImage src={userData.avatar} alt={userData.name} />
                              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm">
                              Change Photo
                            </Button>
                          </div>

                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                  id="location"
                                  name="location"
                                  value={formData.location}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                  id="company"
                                  name="company"
                                  value={formData.company}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                  id="position"
                                  name="position"
                                  value={formData.position}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea
                                id="bio"
                                name="bio"
                                rows={4}
                                value={formData.bio}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button type="submit">
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </form>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center space-y-4">
                          <Avatar className="h-32 w-32">
                            <AvatarImage src={userData.avatar} alt={userData.name} />
                            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <h2 className="text-xl font-bold">{userData.name}</h2>
                            <p className="text-muted-foreground">
                              {userData.userType === "alumni" ? "Alumni" : "Student"}
                            </p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="flex items-center">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                {userData.privacy.showEmail ? userData.email : "Hidden"}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="flex items-center">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                {userData.privacy.showPhone ? userData.phone : "Hidden"}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Location</p>
                              <p className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                {userData.location}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Graduation Year</p>
                              <p className="flex items-center">
                                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                                {userData.graduationYear}
                              </p>
                            </div>

                            {userData.userType === "alumni" && (
                              <>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Company</p>
                                  <p className="flex items-center">
                                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {userData.privacy.showCompany ? userData.company : "Hidden"}
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Position</p>
                                  <p className="flex items-center">
                                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {userData.position}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          <Separator className="my-4" />

                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Bio</p>
                            <p>{userData.bio}</p>
                          </div>

                          <Separator className="my-4" />

                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Skills</p>
                            <div className="flex flex-wrap gap-2">
                              {userData.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Achievements</CardTitle>
                    <CardDescription>Manage which achievements are featured on your public profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Featured Achievements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {userData.achievements.filter((a) => a.featured).length > 0 ? (
                            userData.achievements
                              .filter((achievement) => achievement.featured)
                              .map((achievement) => (
                                <Card key={achievement.id} className="border-primary/20">
                                  <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <Award className="h-5 w-5" />
                                      </div>
                                      <Button variant="ghost" size="sm" onClick={() => toggleFeatured(achievement.id)}>
                                        Unfeature
                                      </Button>
                                    </div>
                                    <CardTitle className="text-base mt-2">{achievement.name}</CardTitle>
                                    <CardDescription className="text-xs">{achievement.description}</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex justify-between text-xs">
                                      <span>{achievement.category}</span>
                                      <span>{new Date(achievement.date).toLocaleDateString()}</span>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))
                          ) : (
                            <div className="col-span-full text-center py-8 text-muted-foreground">
                              No featured achievements. Feature some achievements from the list below.
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">All Achievements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {userData.achievements.map((achievement) => (
                            <Card
                              key={achievement.id}
                              className={achievement.featured ? "border-primary/20 bg-primary/5" : ""}
                            >
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div
                                    className={`p-2 rounded-full ${
                                      achievement.featured
                                        ? "bg-primary/10 text-primary"
                                        : "bg-secondary text-muted-foreground"
                                    }`}
                                  >
                                    <Award className="h-5 w-5" />
                                  </div>
                                  <Button variant="ghost" size="sm" onClick={() => toggleFeatured(achievement.id)}>
                                    {achievement.featured ? "Unfeature" : "Feature"}
                                  </Button>
                                </div>
                                <CardTitle className="text-base mt-2">{achievement.name}</CardTitle>
                                <CardDescription className="text-xs">{achievement.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex justify-between text-xs">
                                  <span>{achievement.category}</span>
                                  <span>{new Date(achievement.date).toLocaleDateString()}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="mt-6">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription>Control what information is visible to others</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="showEmail" className="text-base">
                                Show Email Address
                              </Label>
                              <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                            </div>
                            <Switch
                              id="showEmail"
                              checked={formData.privacy.showEmail}
                              onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="showPhone" className="text-base">
                                Show Phone Number
                              </Label>
                              <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                            </div>
                            <Switch
                              id="showPhone"
                              checked={formData.privacy.showPhone}
                              onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="showCompany" className="text-base">
                                Show Company
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Allow others to see your company information
                              </p>
                            </div>
                            <Switch
                              id="showCompany"
                              checked={formData.privacy.showCompany}
                              onCheckedChange={(checked) => handlePrivacyChange("showCompany", checked)}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button type="submit">
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </form>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Control what information is visible to others</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Email Address</p>
                            <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                          </div>
                          <Badge variant={userData.privacy.showEmail ? "default" : "secondary"}>
                            {userData.privacy.showEmail ? "Visible" : "Hidden"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Phone Number</p>
                            <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                          </div>
                          <Badge variant={userData.privacy.showPhone ? "default" : "secondary"}>
                            {userData.privacy.showPhone ? "Visible" : "Hidden"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Company</p>
                            <p className="text-sm text-muted-foreground">
                              Allow others to see your company information
                            </p>
                          </div>
                          <Badge variant={userData.privacy.showCompany ? "default" : "secondary"}>
                            {userData.privacy.showCompany ? "Visible" : "Hidden"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
