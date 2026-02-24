export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-16 sm:pt-20">
      <h1 className="text-xs font-medium uppercase tracking-wider">About VOXXA</h1>

      <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-600">
        <p>
          VOXXA sells practical audio products designed for daily use.
        </p>
        <p>
          We focus on delivering products that are useful, affordable, and easy
          to order across India.
        </p>

        <div>
          <p className="text-neutral-800">What you can expect from us:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Cash on Delivery available</li>
            <li>Pan-India shipping</li>
            <li>Product replacement support for defects</li>
            <li>Direct customer service via WhatsApp</li>
          </ul>
        </div>

        <p>
          We test our products before listing them and work with verified
          suppliers to ensure reliable delivery.
        </p>
        <p>
          VOXXA is built to provide simple, working solutions - not overhyped
          promises.
        </p>
        <p>
          If you need assistance, our support team is available to help with
          orders and issues.
        </p>
      </div>
    </div>
  );
}
