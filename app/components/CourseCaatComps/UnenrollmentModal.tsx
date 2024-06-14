import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enrollStudentSchema } from "@/app/schema";
import * as z from "zod";
import React, { useTransition, useEffect } from "react";
import { unenrollStudent } from "@/actions/enroll";
import toast, { Toaster } from "react-hot-toast";

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
  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(true);

    return () => setIsModalOpen(false);
  }, [courseId]);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (courseId: string) => {
    startTransition(() => {
      toast.promise(
        unenrollStudent(courseId).then((data) => {
          if (data && data.error) {
            console.log(data.error);
            throw new Error(data.error as string);
          }
          return data?.message;
        }),

        {
          loading: "Updating Enrollment...",
          success: (data) => <b> {data} </b>,
          error: (err) => <b> {err.message} </b>,
        }
      );
    });
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">
        Confirming that you would like to unenroll from {name}{" "}
      </h3>
      <p className="py-4">
        WARNING dear student, unenrolling from a course will remove all your
        progress and you will have to start from scratch.
      </p>
      <p> Are you sure you want to unenroll from this course?</p>
      <form className="space-x-5 flex flex-row">
        <div className="mt-3"> Course Name:</div>
        <input readOnly={true} type="text" value={name} className="w-[40%]" />
        <button onClick={() => onSubmit(courseId)} className="btn">
          I want out. Sorry!
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
