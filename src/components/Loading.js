import React from "react";
import { Button } from "react-bootstrap";

export default function Loading(isLoading) {
  return (
    <div>
      <Button
        onClick={() => {
          window.location.assign("gloader://");
        }}
        variant="dark"
        className="mt-3"
      >
        Return to app
      </Button>
    </div>
  );
}
