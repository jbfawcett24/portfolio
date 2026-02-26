import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    sendEmail: defineAction({
        input: z.object({
            email: z.string().email(),
            name: z.string().min(2),
            message: z.string()
        }),
        handler: async (input) => {
            console.log(input);
            const {data, error} = await resend.emails.send({
                from: "no_reply@contact.jbfawcett.dev",
                to: ['dev.jbfawcett@gmail.com'],
                subject: `New Portfolio Message - From ${input.name}: ${input.email}`,
                html: input.message
            })
            if (error) {
                console.log(error)
                return error
            }
            return data;
        }
    })
}