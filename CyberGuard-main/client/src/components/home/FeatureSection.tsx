import React from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features }) => {
  return (
    <section
      id="features"
      className="py-24 bg-gray-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
      <div className="absolute top-0 left-1/3 w-1 h-20 bg-gradient-to-b from-cyan-400 to-transparent opacity-30"></div>
      <div className="absolute top-0 right-1/4 w-1 h-40 bg-gradient-to-b from-purple-400 to-transparent opacity-20"></div>

      <div className="container px-4 sm:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ml-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
              Advanced Security Features
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Our comprehensive suite of security tools helps you discover,
            monitor, and protect your sensitive information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 relative overflow-hidden group transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Card reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4 p-3 bg-gray-900/50 rounded-lg inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>

              {/* Glowing border on hover */}
              <div className="absolute inset-0 border border-cyan-400/0 rounded-xl transition-all duration-300 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_15px_rgba(49,225,247,0.3)]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
