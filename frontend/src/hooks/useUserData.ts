"use client";

import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase";

import { useAuth } from "@/src/context/AuthContext";

type UserData = {
  uid: string;
  name: string;
  email: string;
};

export function useUserData() {

  const { user } = useAuth();

  const [userData, setUserData] =
    useState<UserData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchUserData = async () => {

      if (!user) {

        setLoading(false);

        return;
      }

      try {

        const docRef = doc(
          db,
          "users",
          user.uid
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          setUserData(
            docSnap.data() as UserData
          );
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchUserData();

  }, [user]);

  return {
    userData,
    loading,
  };
}