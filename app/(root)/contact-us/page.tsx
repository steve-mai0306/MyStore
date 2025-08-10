"use client";

import { Container } from "@/components/layout";
import { StyledBreadcrumb } from "@/components/styled";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/types/entities/schemas/contact-schema";

export default function ContactUsPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      subject: "",
      message: "",
    },
  });
  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here, e.g., API call
  };

  return (
    <>
      <StyledBreadcrumb route="Contact Us" />
      <Container>
        <section className="contact-section">
          <div className="flex flex-col md:flex-row gap-10 pb-20">
            <div className="embedded-map h-[50vh] md:h-[80vh] w-full md:w-1/2 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52919.78702960551!2d-118.48525405199331!3d34.005716265355744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba91daa90489%3A0x85345b36bd6d03ae!2sPrint%20Heaven!5e0!3m2!1sen!2s!4v1754030159232!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <h2 className="text-2xl lg:text-4xl my-3 font-bold uppercase tracking-wide">
                Keep in touch with us
              </h2>
              <h2 className="text-lg text-muted-foreground my-3">
                See what’s trending right now. We’re something other than
                duplicates
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-1/2">
                  <h2 className="text-xl lg:text-2xl my-3 uppercase">
                    Address
                  </h2>
                  <h2 className="text-lg text-muted-foreground my-3">
                    3245 Abbot Kinney BLVD - PH Venice, CA 124
                  </h2>
                </div>
                <div className="flex flex-col w-1/2">
                  <h2 className="text-xl lg:text-2xl my-3 uppercase">
                    Contact
                  </h2>
                  <div className="text-lg text-muted-foreground my-3">
                    <span className="font-bold">Email:</span> info@example.com
                  </div>
                  <div className="text-lg text-muted-foreground my-3">
                    <span className="font-bold">Hotline:</span> 1900 26886
                  </div>
                  <div className="text-lg text-muted-foreground my-3">
                    <span>Hotline:</span> 1900 26886
                  </div>
                </div>
              </div>
              <div className="send-message flex flex-col">
                <h2 className="text-2xl lg:text-2xl my-3 font-bold uppercase tracking-wide">
                  Send a message
                </h2>
                <Form {...form}>
                  <form
                    className="contact-form flex flex-col gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="flex flex-row gap-4 pt-5">
                      <div className="w-1/2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="John"
                                  required
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-1/2">
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Doe"
                                  required
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder=""
                              required
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder=""
                              required
                              className="h-60"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <InteractiveHoverButton type="submit" className="uppercase">
                      Submit
                    </InteractiveHoverButton>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
