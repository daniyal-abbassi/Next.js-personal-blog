//STRUCTURE OF CREATE POST TAB
import { TabsContent } from "@/app/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/card";

export default function CreatePostTab({ children }:{children: React.ReactNode}) {
  return (
    <TabsContent value="create">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Create a new post here.</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </TabsContent>
  );
}
