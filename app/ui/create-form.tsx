


import { Tag } from '@prisma/client';

interface FormProps {
  tags: Tag[];
}

export default function Form({tags}: FormProps){
    return (
        <form>
            <label htmlFor="title" className="mb-2 block text-sm font-medium">Title: </label>
            <input type="text" name="title" id="title"  className="border"/>

            <label htmlFor="content"  className="mb-2 block text-sm font-medium">Content: </label>
            <input type="text" name="content" id="content" className="border"/>

            <input type="submit" value="Create"  className="border my-4 p-4 rounded block text-sm font-medium"/>
        </form>
    )
}