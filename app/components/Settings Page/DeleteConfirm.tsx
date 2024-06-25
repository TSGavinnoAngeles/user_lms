import React from "react";
import { delStudent } from "@/actions/student";

const DeleteConfirm = () => {
  const handleDelete = async () => {
    await delStudent();

    window.location.reload();
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Confirming Deletion </h3>
      <p className="py-4">
        Your Account will be deleted and all your progress will be lost!
      </p>
      <p>
        {" "}
        By pressing enroll we will start the process for you and you can start
        taking the course as soon as you can!
      </p>

      <div className=" flex flex-row gap-3">
        <div className="modal-action">
          <button
            onClick={handleDelete}
            type="submit"
            className="btn bg-bittersweet_shimmer text-uranian_blue-900 outline outline-2"
          >
            Sign me up!
          </button>

          <form method="dialog">
            <button
              className="btn 
              "
            >
              Nevermind!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
