import Form from "@/app/ui/create-form";

export default function Page() {
    return (
        <div  className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h2>creata post form</h2>
            <Form />
        </div>
    )
}