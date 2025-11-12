import z from "zod";

export const PROJECT_STATUSES = ["draft", "in_progress", "completed"] as const;

const notificationsSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  push: z.boolean(),
});

export const NOTIFICATION_TYPES = Object.keys(
  notificationsSchema.shape
) as Array<keyof z.infer<typeof notificationsSchema>>;

export const projectSchema = z.object({
  name: z.string().min(1),
  description: z
    .string()
    .optional()
    .transform((val) => val || undefined),
  status: z.enum(PROJECT_STATUSES),
  notifications: notificationsSchema,
  users: z
    .array(
      z.object({
        email: z.email(),
      })
    )
    .min(1)
    .max(5),
});

export type Project = z.infer<typeof projectSchema>;
