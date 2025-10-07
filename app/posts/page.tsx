import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import { DeletePost, EditPost } from "@/app/ui/buttons";
import { Post } from "@prisma/client";
import { signOut, auth } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

interface PostProps {
  post: Post[];
}

export default async function Home() {


  return (
   
  );
}
