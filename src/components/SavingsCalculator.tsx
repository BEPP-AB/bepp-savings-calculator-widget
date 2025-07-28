import { useState } from "react";

const MIN_EMPLOYEE_COUNT = 5;
const MAX_EMPLOYEE_COUNT = 125;
const DEFAULT_EMPLOYEE_COUNT = 30;

const REGISTERED_INCIDENTS_PER_EMPLOYEE_PER_MONTH_WITHOUT_BEEP = 0.1;
const REGISTERED_INCIDENTS_PER_EMPLOYEE_PER_MONTH_WITH_BEEP = 0.5;

const RATIO_OF_INCIDENTS_THAT_LEAD_TO_ACTION_WITHOUT_BEEP = 0.2;
const RATIO_OF_INCIDENTS_THAT_LEAD_TO_ACTION_WITH_BEEP = 0.4;

const VALUE_OF_ACTION = 3500; // SEK

// Pricing tiers based on employee count
const calculateMonthlyCost = (employeeCount: number): number => {
  if (employeeCount >= 1 && employeeCount <= 10) return 1450;
  if (employeeCount >= 11 && employeeCount <= 20) return 1950;
  if (employeeCount >= 21 && employeeCount <= 35) return 2450;
  if (employeeCount >= 36 && employeeCount <= 60) return 3250;
  if (employeeCount >= 61 && employeeCount <= 90) return 4050;
  if (employeeCount >= 91 && employeeCount <= 125) return 4950;
  // For >126 employees, return a placeholder since it requires a quote
  return 0; // "Offert" - custom pricing
};

const SavingsCalculator = () => {
  const [employeeCount, setEmployeeCount] = useState(DEFAULT_EMPLOYEE_COUNT);
  const [showCalculation, setShowCalculation] = useState(false);

  const totalActionValueWithoutBepp =
    employeeCount *
    REGISTERED_INCIDENTS_PER_EMPLOYEE_PER_MONTH_WITHOUT_BEEP *
    RATIO_OF_INCIDENTS_THAT_LEAD_TO_ACTION_WITHOUT_BEEP *
    VALUE_OF_ACTION;

  const totalActionValueWithBepp =
    employeeCount *
    REGISTERED_INCIDENTS_PER_EMPLOYEE_PER_MONTH_WITH_BEEP *
    RATIO_OF_INCIDENTS_THAT_LEAD_TO_ACTION_WITH_BEEP *
    VALUE_OF_ACTION;

  const monthlyCost = calculateMonthlyCost(employeeCount);
  const monthlyValue = totalActionValueWithBepp - totalActionValueWithoutBepp;
  const monthlyProfit = monthlyValue - monthlyCost;
  const yearlyProfit = monthlyProfit * 12;

  const isOverMaxEmployees = employeeCount > MAX_EMPLOYEE_COUNT;

  return (
    <div className="p-8 max-w-2xl text-white rounded-3xl border border-[#2F3338] mx-auto bg-[#ffffff05]">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-medium mb-4">OM VERKSAMHETEN</h1>
      </div>

      {/* Employee Count Section */}
      <div className="mb-12">
        <div className="flex flex-row justify-center items-center mb-8">
          <h2 className="text-xl font-medium">Hur många anställda är ni?</h2>
          <div className="ml-4 bg-gray-800 px-4 py-2 rounded-lg text-lg font-semibold min-w-[80px] text-center">
            {employeeCount <= MAX_EMPLOYEE_COUNT
              ? employeeCount
              : MAX_EMPLOYEE_COUNT + "+"}
          </div>
        </div>

        {/* Custom Slider */}
        <div className="relative flex flex-row items-center">
          <input
            type="range"
            min={MIN_EMPLOYEE_COUNT}
            max={MAX_EMPLOYEE_COUNT + 1}
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer 
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer 
                       [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:shadow-lg
                       [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full 
                       [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none 
                       [&::-moz-range-thumb]:shadow-lg"
            style={{
              background: `linear-gradient(to right, white 0%, white ${
                ((employeeCount - MIN_EMPLOYEE_COUNT) /
                  (MAX_EMPLOYEE_COUNT + 1 - MIN_EMPLOYEE_COUNT)) *
                100
              }%, #374151 ${
                ((employeeCount - MIN_EMPLOYEE_COUNT) /
                  (MAX_EMPLOYEE_COUNT + 1 - MIN_EMPLOYEE_COUNT)) *
                100
              }%, #374151 100%)`,
            }}
          />
        </div>
      </div>

      {/* Conditional Content */}
      {isOverMaxEmployees ? (
        /* Contact Us Section for 126+ employees */
        <div className="text-center">
          <p className="text-lg mb-8 leading-relaxed">
            För er som är fler än {MAX_EMPLOYEE_COUNT} anställda ber vi er
            kontakta oss för offert och mer utförliga detaljer kring hur mycket
            er verksamhet kan spara genom att använda Bepp.
          </p>
          <a
            href="/kontakt"
            className="bg-[#e99529] text-[16px] text-white font-semibold py-3 px-8 rounded-full transition-colors"
          >
            Kontakta oss
          </a>
        </div>
      ) : (
        /* Calculation Section for ≤125 employees */
        <>
          {/* Summary Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-8">Sammanställning</h3>

            <div className="space-y-6">
              <div className="space-y-1">
                {/* Cost Row */}
                <div className="flex flex-row justify-between items-start">
                  <div className="flex-1">
                    <div className="text-base">Kostnad för Bepp</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium">
                      - {monthlyCost.toLocaleString()} kr / mån
                    </div>
                  </div>
                </div>

                {/* Value Row */}
                <div className="flex flex-row justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="text-base">
                      Uppskattat värde av implementerade
                      <br />
                      förbättringar genom Bepp
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium">
                      {monthlyValue.toLocaleString()} kr / mån
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator Line */}
              <div className="border-t border-[#2F3338]"></div>

              {/* Total Profit Row */}
              <div className="flex flex-row justify-between items-start pt-2 text-[#e99529]">
                <div className="flex-1">
                  <div className="text-lg font-medium">
                    Totalt ökad lönsamhet med Bepp
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-semibold">
                    {monthlyProfit.toLocaleString()} kr / mån
                  </div>
                  <div className="text-xl font-semibold">
                    {yearlyProfit.toLocaleString()} kr / år
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Explanation */}
          <div className="flex flex-row items-start space-x-3">
            <button
              onClick={() => setShowCalculation(!showCalculation)}
              className="flex flex-row items-start space-x-3 cursor-pointer rounded"
            >
              <svg
                className={`mt-1 w-4 h-4 text-white transition-transform duration-200 ${
                  showCalculation ? "rotate-90" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-base select-none">Såhär har vi räknat</span>
            </button>
          </div>

          {/* Calculation Details (conditionally shown) */}
          {showCalculation && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <div className="space-y-4 text-sm">
                <div>
                  <h5 className="font-medium text-[#e99529] mb-2">
                    1. Utan Bepp:
                  </h5>
                  <ul className="space-y-1 ml-4">
                    <li>
                      • Varje anställd registrerar{" "}
                      <strong>0,1 incidenter per månad</strong>
                    </li>
                    <li>
                      • <strong>20%</strong> av dessa incidenter leder till
                      förbättringsåtgärder
                    </li>
                    <li>
                      • Varje åtgärd värderas till <strong>3 500 kr</strong>
                    </li>
                    <li>
                      • Månadsvärde: {employeeCount} × 0,1 × 0,2 × 3 500 ={" "}
                      <strong>
                        {totalActionValueWithoutBepp.toLocaleString()} kr
                      </strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-[#e99529] mb-2">
                    2. Med Bepp:
                  </h5>
                  <ul className="space-y-1 ml-4">
                    <li>
                      • Varje anställd registrerar{" "}
                      <strong>0,5 incidenter per månad</strong>
                    </li>
                    <li>
                      • <strong>40%</strong> av dessa incidenter leder till
                      förbättringsåtgärder
                    </li>
                    <li>
                      • Varje åtgärd värderas till <strong>3 500 kr</strong>
                    </li>
                    <li>
                      • Månadsvärde: {employeeCount} × 0,5 × 0,4 × 3 500 ={" "}
                      <strong>
                        {totalActionValueWithBepp.toLocaleString()} kr
                      </strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-[#e99529] mb-2">
                    3. Beräkning av vinst:
                  </h5>
                  <ul className="space-y-1 ml-4">
                    <li>
                      • Ökat värde per månad:{" "}
                      {totalActionValueWithBepp.toLocaleString()} -{" "}
                      {totalActionValueWithoutBepp.toLocaleString()} ={" "}
                      <strong>{monthlyValue.toLocaleString()} kr</strong>
                    </li>
                    <li>
                      • Kostnad för Bepp:{" "}
                      <strong>{monthlyCost.toLocaleString()} kr/månad</strong>
                    </li>
                    <li>
                      • Nettovinst per månad: {monthlyValue.toLocaleString()} -{" "}
                      {monthlyCost.toLocaleString()} ={" "}
                      <strong>{monthlyProfit.toLocaleString()} kr</strong>
                    </li>
                    <li>
                      • Nettovinst per år: {monthlyProfit.toLocaleString()} × 12
                      = <strong>{yearlyProfit.toLocaleString()} kr</strong>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-700 p-3 rounded mt-4">
                  <p className="text-xs text-gray-300">
                    <strong>Antaganden:</strong> Beräkningen baseras på att Bepp
                    ökar både antalet rapporterade incidenter (från 0,1 till 0,5
                    per anställd/månad) och andelen som leder till åtgärder
                    (från 20% till 40%). Värdet per åtgärd uppskattas till 3 500
                    kr baserat på typiska förbättringar inom arbetsmiljö och
                    säkerhet.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavingsCalculator;
