import React from "react";

const Statistics = () => {
  return (
    <div>
      <section className="w-full  py-12 md:py-24 lg:py-32 gradient-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold text-white">50</h3>
              <p className="text-blue-100">Industries Covered</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold text-white">1000+</h3>
              <p className="text-blue-100">Interview Questions</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold text-white">95%</h3>
              <p className="text-blue-100">Success Rate</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold text-white">24/7</h3>
              <p className="text-blue-100">AI Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
