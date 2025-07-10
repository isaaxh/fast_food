import { Redirect, Slot } from "expo-router";
import React from "react";

export default function _layout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href='/sign-in' />;

  return <Slot />;
}
