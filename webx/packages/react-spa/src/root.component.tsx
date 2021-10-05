import { UiButton } from "ui-library-react";

import "./root.component.css";

export default function Root() {
  return <section>
    <h1 className="sign-in-title">Sign in</h1>

    <div>
      <UiButton>Sign in</UiButton>
    </div>
  </section>;
}
