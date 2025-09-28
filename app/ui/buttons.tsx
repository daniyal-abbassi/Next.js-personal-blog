import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";



export  function EditPost({id}: {id : number}) {
    return (
        <Link href={`/${id}/edit`} className="rounded-md border p-2 ">
            <PencilIcon className="w-5" />
        </Link>
    )
}