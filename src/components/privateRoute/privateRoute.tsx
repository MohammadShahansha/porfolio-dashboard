// "use client";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";

// const PrivateRoute = <P extends object>(
//   WrappedComponent: React.ComponentType<P>
// ) => {
//   const ComponentPrivate = (props: P) => {
//     const router = useRouter();

//     useEffect(() => {
//       const user = localStorage.getItem("user");
//       if (!user) {
//         router.push("/login"); // Redirect to login page if not authenticated
//       }
//     }, [router]);

//     const user = localStorage.getItem("user");
//     if (!user) {
//       router.push("/login"); // Render nothing or a loading spinner
//     }

//     return <WrappedComponent {...props} />;
//   };

//   return ComponentPrivate;
// };

// export default PrivateRoute;
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PrivateRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentPrivate = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/login");
      }
    }, [router]);

    if (isAuthenticated === null) {
      return null; // Render nothing or a loading spinner while checking authentication
    }

    if (!isAuthenticated) {
      return null; // Render nothing if not authenticated
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentPrivate;
};

export default PrivateRoute;
