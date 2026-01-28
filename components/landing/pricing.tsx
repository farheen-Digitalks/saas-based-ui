const plans = [
  {
    name: "Free",
    price: "₹0",
    duration: "Forever",
    features: ["Basic Features", "Limited Users", "Community Support"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "₹999",
    duration: "per month",
    features: ["All Free Features", "Advanced Reports", "Priority Support"],
    cta: "Request Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    duration: "",
    features: ["Unlimited Users", "Dedicated Manager", "Custom Integrations"],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="plans" className="py-20 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-blue-600 shadow-xl scale-105"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold">{plan.price}</p>
              <p className="text-sm text-gray-500 mb-6">{plan.duration}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f}>✔ {f}</li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-xl bg-blue-600 text-white">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
