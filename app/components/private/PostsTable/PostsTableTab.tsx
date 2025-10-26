//MAIN POSTS TABLE, SEARCH + POSTS LIST(children) + FOOTER(pagination)
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/card";
// import Sort from "./Sort";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
// import Pages from "./Pages";
import { TabsContent } from "@/app/ui/tabs";
// import PropTypes from "prop-types";

export default function PostsTableTab({
  // setSortValue,
  // setOrder,
  // setSearch,
  // metadata,
  children,
} :{children: React.ReactNode}) {
  return (
    <TabsContent value="posts">
      <Card>
        <CardHeader className="flex-row flex-wrap justify-between gap-2 items-start">
          <div className="space-y-2">
            <CardTitle>Posts</CardTitle>
            <CardDescription>
              All your published & un-published posts here.
            </CardDescription>
          </div>
          <div className="flex gap-4 flex-wrap">
            {/* <Sort setSortValue={setSortValue} setOrder={setOrder} /> */}
            <div className="flex gap-2 min-w-200px">
              <Input type="search" placeholder="Search" />
              <Button
                // onClick={(e) => setSearch(e.target.previousSibling.value)}
              >
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          {/* <Pages {...metadata} /> */}
          <h2>Pagination is here</h2>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
