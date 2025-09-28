import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deletePost } from "../lib/actions";


export  function EditPost({id}: {id : number}) {
    return (
        <Link href={`/${id}/edit`} className="rounded-md border p-2 hover:border-blue-500">
            <PencilIcon className="w-5" />
        </Link>
    )
}

export function DeletePost({id} : {id: number}) {

    const deletePostById = deletePost.bind(null,id)
    return (
        <form action={deletePostById}>
            <button type="submit" className="rounded-md border hover:border-red-500 p-2 cursor-pointer">
                <span className="sr-only"> Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    )
}