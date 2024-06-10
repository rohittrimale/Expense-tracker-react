import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { user, sendEmailVerification, isVerifyUser } = useContext(UserContext);
  const [verificationMessage, setVerificationMessage] = useState("");
  const navigate = useNavigate();

  const handleSendVerification = async () => {
    try {
      await sendEmailVerification();
      setVerificationMessage(
        "Verification email sent. Please check your inbox."
      );
    } catch (error) {
      console.log(error);
      setVerificationMessage("Error sending verification email.");
    }
  };

  useEffect(() => {
    if (isVerifyUser) {
      navigate("/");
    }
  }, [isVerifyUser, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Verify Email</h1>

      {user ? (
        <>
          <p>Email: {user.email}</p>
          {!user.emailVerified && (
            <>
              <button
                onClick={handleSendVerification}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Send Verification Email
              </button>
              {verificationMessage && (
                <p className="mt-2 text-red-500">{verificationMessage}</p>
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VerifyEmail;
