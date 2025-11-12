"use client";

import { Button } from "@/src/shared/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/src/shared/components/ui/field";
import {
  NOTIFICATION_TYPES,
  Project,
  PROJECT_STATUSES,
  projectSchema,
} from "@/src/modules/domain/project-schema";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/src/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/src/shared/components/ui/input-group";
import { XIcon } from "lucide-react";
import { FormInput } from "@/src/shared/components/form";

export default function Home() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      notifications: {
        email: false,
        push: false,
        sms: false,
      },
      status: "draft" as const,
      users: [
        {
          email: "",
        },
      ],
    },

    resolver: zodResolver(projectSchema),
  });

  const {
    fields: users,
    append: appendUser,
    remove: removeUser,
  } = useFieldArray({
    control: form.control,
    name: "users",
  });

  const onSubmit = (data: Project) => {
    console.log("data", data);
  };

  return (
    <div className="p-9">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1>Form Tet</h1>

        <FieldGroup>
          <FormInput control={form.control} name="name" label="Name" />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldDescription>Be specific as possible</FieldDescription>
                </FieldContent>

                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="status"
            control={form.control}
            render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger
                    onBlur={onBlur}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FieldSet>
            <FieldGroup data-slot="checkbox-group">
              <FieldContent>
                <FieldLegend>Notifications</FieldLegend>

                <FieldDescription>
                  Select How you would like to receive notifications
                </FieldDescription>
              </FieldContent>

              {NOTIFICATION_TYPES.map((notificationType) => (
                <Controller
                  key={notificationType}
                  name={`notifications.${notificationType}`}
                  control={form.control}
                  render={({
                    field: { value, onChange, ...field },
                    fieldState,
                  }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation={"horizontal"}
                    >
                      <Checkbox
                        {...field}
                        id={field.name}
                        checked={value}
                        onCheckedChange={onChange}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>
                          {notificationType}
                        </FieldLabel>
                        {/* <FieldError errors={[{ message: "error" }]} /> */}
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <FieldSet>
            <div>
              <FieldContent>
                <FieldLegend variant="label" className="mb-0">
                  User Email Addresses
                </FieldLegend>
              </FieldContent>
              <FieldDescription>Up to 5 users</FieldDescription>

              {form.formState.errors.users?.root && (
                <FieldError errors={[form.formState.errors.users?.root]} />
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendUser({ email: "" })}
              >
                Append User
              </Button>
            </div>
            <FieldGroup>
              {users.map((user, index) => (
                <Controller
                  key={user.id}
                  name={`users.${index}.email`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          type="email"
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          aria-label={`User ${index + 1} email`}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant={"ghost"}
                            size={"icon-xs"}
                            onClick={() => removeUser(index)}
                            aria-label={`Remove user ${index + 1} email`}
                          >
                            <XIcon />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </FieldSet>

          <Button>Save</Button>
        </FieldGroup>
      </form>
    </div>
  );
}
