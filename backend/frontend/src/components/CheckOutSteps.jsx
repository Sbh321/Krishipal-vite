import { Link } from "react-router-dom";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-4">
      <NavItem active={step1} disabled={!step1} to="/login" label="Sign In" />
      <NavItem
        active={step2}
        disabled={!step2}
        to="/shipping"
        label="Shipping"
      />
      <NavItem active={step3} disabled={!step3} to="/payment" label="Payment" />
      <NavItem
        active={step4}
        disabled={!step4}
        to="/placeorder"
        label="Place Order"
      />
    </nav>
  );
};

const NavItem = ({ active, disabled, to, label }) => {
  return (
    <Link
      to={to}
      className={`px-4 py-2 text-center select-none ${
        disabled
          ? "text-gray-500 cursor-not-allowed"
          : active
          ? "text-accent font-bold"
          : "text-gray-700 hover:text-accent"
      }`}
    >
      {label}
    </Link>
  );
};

export default CheckOutSteps;
