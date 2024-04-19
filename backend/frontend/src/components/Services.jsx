import FeatureCard from "./FeatureCard";
import {
  LiaShippingFastSolid,
  LiaMoneyBillWaveSolid,
  LiaGiftSolid,
} from "react-icons/lia";
import { FiPhoneCall } from "react-icons/fi";

const Services = () => {
  const data = [
    {
      title: "Free Shipping",
      icon: <LiaShippingFastSolid />,
    },
    {
      title: "Best Price",
      icon: <LiaMoneyBillWaveSolid />,
    },
    {
      title: "Free Curbside Pickup",
      icon: <LiaGiftSolid />,
    },
    {
      title: "24/7 Support",
      icon: <FiPhoneCall />,
    },
  ];
  return (
    <div className="container pt-16 mb-14">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map((el) => (
          <FeatureCard key={el.title} title={el.title} icon={el.icon} />
        ))}
      </div>
    </div>
  );
};

export default Services;
