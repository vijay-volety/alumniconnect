import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Award, Star, Gift, User } from "lucide-react"
import { PointsHistory } from "@/components/points-history"
import { AvailableBadges } from "@/components/available-badges"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GamificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gamification Portal</h1>
        <p className="text-muted-foreground">Earn points, unlock badges, and climb the leaderboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Your Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">120</div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1 text-sm">
                <span>Level 2</span>
                <span>Level 3 (200 pts)</span>
              </div>
              <Progress value={60} />
            </div>
            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
              <div>Rank: 45th</div>
              <div>Top 15%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-2 mb-1">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs">First Login</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-2 mb-1">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs">Networker</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-2 mb-1">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs">Donor</span>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              <Badge variant="outline">7 of 25 badges unlocked</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-secondary rounded-full p-2">
                <User className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Profile Completer</div>
                <div className="text-xs text-muted-foreground">Fill out 100% of your profile</div>
                <Progress value={80} className="h-1.5 mt-1.5" />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-secondary rounded-full p-2">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Event Enthusiast</div>
                <div className="text-xs text-muted-foreground">Attend 5 alumni events</div>
                <Progress value={40} className="h-1.5 mt-1.5" />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-secondary rounded-full p-2">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Mentor Master</div>
                <div className="text-xs text-muted-foreground">Mentor 3 students</div>
                <Progress value={33} className="h-1.5 mt-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leaderboard" className="mt-8">
        <TabsList>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="badges">All Badges</TabsTrigger>
          <TabsTrigger value="history">Points History</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Alumni who have made the biggest impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="font-bold text-lg w-6">{i}</div>
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">User Name {i}</div>
                      <div className="text-sm text-muted-foreground">Class of {2020 - i}</div>
                    </div>
                    <div className="font-medium">{550 - i * 50} pts</div>
                    {i === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                    {i === 2 && <Trophy className="h-5 w-5 text-gray-400" />}
                    {i === 3 && <Trophy className="h-5 w-5 text-amber-700" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="badges" className="mt-6">
          <AvailableBadges />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <PointsHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
