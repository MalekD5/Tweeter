import { Textarea, Text, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { z } from 'zod';
import validator from "validator";
import { useCreatePostMutation} from "@/redux/features/posts/postsSlice";

const postSchema = z.object({
    postText: z.string().trim().min(1).max(280).transform(validator.escape),
})

function CreatePost() {
    const { handleSubmit, register } = useForm({
        resolver: zodResolver(postSchema)
    });

    const [ createPostMutation ] = useCreatePostMutation();

    const onSubmit = async (data: any) => {
        console.log(data.postText);
        try {
            const response = await createPostMutation({ postText: data.postText }).unwrap();
            console.log(response)
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div>
            <Text h3 b>Create a Post:</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Textarea {...register('postText')} />
                <Button type='submit'>Post</Button>
            </form>
        </div>
    );
}

export default CreatePost;