"use server" 

export async function createPost(formData: FormData) {
    const rawFormData = {
        tag: formData.get('tag'),
        title: formData.get('title'),
        content: formData.get('content'),
        publishStatus: formData.get('publishStatus'),
    };
    
}