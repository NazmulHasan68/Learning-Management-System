import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const Login =()=> {
  return (
    <div className="flex items-center justify-center mt-6 md:mt-12">
        <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
            <Card>
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>
                create a new account and click signup when you're done
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input type="text"  placeholder="Nazmul hasan"  className="text-gray-700"/>
                </div>
                <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="Email" required="true" className="text-gray-700" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="password" required="true"  className="text-gray-700"  />
                </div>
            </CardContent>
            <CardFooter>
                <Button>SignUp</Button>
            </CardFooter>
            </Card>
        </TabsContent>



        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                Login your password here.After signup , you'll be logged in.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input placeholder="Email" type="email" required="true"  className="text-gray-700" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input placeholder="password" required="true"  className="text-gray-700"/>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Login</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  )
}
