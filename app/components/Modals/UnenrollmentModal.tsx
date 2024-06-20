import React, { useTransition, useEffect } from "react";
import { unenrollStudent } from "@/actions/enroll";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

interface EnrollmentModalProps {
  courseId: string;
  name: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  courseId,
  name,
  isOpen,
  setIsOpen,
}) => {
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
    <AnimatePresence>
      <Toaster />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className=" bg-citypop-100 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div>
                {/* <User5 variant="32x32_4"/>s */}
                <h3 className="text-3xl font-bold text-center mb-2">
                  Unenrollment Notice!!!
                </h3>
              </div>
              <p className="text-center mb-6">
                WARNING dear student, unenrolling from a course will remove all
                your progress and you will have to start from scratch. Are you
                sure you want to unenroll from this course?
              </p>

              <form className="space-x-5 flex flex-row">
                <div className="mt-3"> Course Name:</div>
                <input
                  readOnly={true}
                  type="text"
                  value={name}
                  className="w-auto p-1 bg-transparent border-b-2 border-white text-white font-semibold transition-colors duration-300 hover:border-black"
                />
                <button
                  onClick={() => onSubmit(courseId)}
                  type="submit"
                  className="rounded-2xl border-2 border-dashed border-black bg-white p-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                >
                  Understood
                </button>
              </form>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className=" mt-5 bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal;
