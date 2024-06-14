import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enrollStudentSchema } from "@/app/schema";
import * as z from "zod";
import React, { useTransition, useEffect } from "react";
import { enrollStudent } from "@/actions/enroll";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EnrollmentModalProps {
  courseId: string;
  name: string;
  setIsModalOpen: (isOpen: boolean) => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  courseId,
  name,
  setIsModalOpen,
}) => {
  const router = useRouter();
  const handleClose = () => {
    // Your existing code...
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Call setIsModalOpen with true when the modal opens
    setIsModalOpen(true);

    // Call setIsModalOpen with false when the modal closes
    return () => setIsModalOpen(false);
  }, [courseId]);

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof enrollStudentSchema>>({
    resolver: zodResolver(enrollStudentSchema),
    defaultValues: {
      courseName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof enrollStudentSchema>) => {
    startTransition(() => {
      toast.promise(
        enrollStudent(values).then((data) => {
          if (data && data.error) {
            console.log(data.error);
            throw new Error(data.error as string);
          }
          window.location.reload();
          return data?.message;
        }),

        {
          loading: "Updating Course...",
          success: (data) => <b> {data} </b>,
          error: (err) => <b> {err.message} </b>,
        }
      );
    });
  };
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Confirming Enrollment for {name} </h3>
      <p className="py-4">
        Before we get started with your course we just want to confirm that you
        want to take this course!
      </p>
      <p>
        {" "}
        By pressing enroll we will start the process for you and you can start
        taking the course as soon as you can!
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-x-5 flex flex-row"
      >
        <div className="mt-3"> Course Name:</div>
        <input
          readOnly={true}
          {...form.register("courseName")}
          type="text"
          value={name}
          className="w-[40%]"
        />
        <button onClick={handleClose} type="submit" className="btn">
          Sign me up!
        </button>
      </form>
      <div className="modal-action justify-center">
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn 
          "
          >
            Nevermind!
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentModal;
