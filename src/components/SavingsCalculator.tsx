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
    <div className="tw-p-8 tw-max-w-2xl tw-text-white tw-rounded-3xl tw-border tw-border-solid tw-border-[#2F3338] tw-mx-auto tw-bg-[#ffffff05]">
      {/* Header */}
      <div className="tw-text-center tw-mb-4">
        <h1 className="tw-text-2xl tw-font-bold tw-m-0 tw-text-[#e99529]">
          {isOverMaxEmployees ? "x" : yearlyProfit.toLocaleString()} kr / år
        </h1>
        <p className="tw-text-sm tw-text-gray-300 tw-mt-0">
          potentiell ökad lönsamhet med Bepp
        </p>
      </div>

      {/* Employee Count Section */}
      <div className="tw-mb-12">
        <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-mb-8">
          <h2 className="tw-text-xl tw-my-[16px] tw-font-medium">
            Hur många anställda är ni?
          </h2>
          <div className="tw-ml-4 tw-bg-gray-800 tw-px-4 tw-py-2 tw-rounded-lg tw-text-lg tw-font-semibold tw-min-w-[40px] tw-text-center">
            {employeeCount <= MAX_EMPLOYEE_COUNT
              ? employeeCount
              : MAX_EMPLOYEE_COUNT + "+"}
          </div>
        </div>

        {/* Custom Slider */}
        <div className="tw-relative tw-flex tw-flex-row tw-items-center">
          <input
            type="range"
            min={MIN_EMPLOYEE_COUNT}
            max={MAX_EMPLOYEE_COUNT + 1}
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            className="tw-flex-1 tw-h-2 tw-bg-gray-700 tw-rounded-lg tw-appearance-none tw-cursor-pointer 
                       [&::-webkit-slider-thumb]:tw-appearance-none [&::-webkit-slider-thumb]:tw-h-5 [&::-webkit-slider-thumb]:tw-w-5 
                       [&::-webkit-slider-thumb]:tw-rounded-full [&::-webkit-slider-thumb]:tw-bg-white [&::-webkit-slider-thumb]:tw-cursor-pointer 
                       [&::-webkit-slider-thumb]:tw-border-none [&::-webkit-slider-thumb]:tw-shadow-lg
                       [&::-moz-range-thumb]:tw-h-5 [&::-moz-range-thumb]:tw-w-5 [&::-moz-range-thumb]:tw-rounded-full 
                       [&::-moz-range-thumb]:tw-bg-white [&::-moz-range-thumb]:tw-cursor-pointer [&::-moz-range-thumb]:tw-border-none 
                       [&::-moz-range-thumb]:tw-shadow-lg"
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
        <div className="tw-text-center">
          <p className="tw-text-lg tw-mb-8 tw-leading-relaxed">
            För er som är fler än {MAX_EMPLOYEE_COUNT} anställda ber vi er
            kontakta oss för offert och mer utförliga detaljer kring hur mycket
            er verksamhet kan spara genom att använda Bepp.
          </p>
          <a
            href="/kontakt"
            className="tw-bg-[#e99529] tw-no-underline tw-p-[10px] tw-px-[20px] tw-text-[16px] tw-text-white tw-font-semibold tw-py-3 tw-rounded-full tw-transition-colors"
          >
            Kontakta oss
          </a>
        </div>
      ) : (
        /* Calculation Section for ≤125 employees */
        <>
          {/* Summary Section */}
          <div className="tw-mb-8">
            <h3 className="tw-text-2xl tw-font-semibold tw-mb-8">
              Sammanställning
            </h3>

            <div className="tw-space-y-6">
              <div className="tw-space-y-1">
                {/* Cost Row */}
                <div className="tw-flex tw-flex-row tw-justify-between tw-items-start">
                  <div className="tw-flex-1">
                    <div className="tw-text-base">Kostnad för Bepp</div>
                  </div>
                  <div className="tw-text-right">
                    <div className="tw-text-lg tw-font-medium">
                      - {monthlyCost.toLocaleString()} kr / mån
                    </div>
                  </div>
                </div>

                {/* Value Row */}
                <div className="tw-flex tw-flex-row tw-justify-between tw-items-start">
                  <div className="tw-flex-1 tw-pr-4">
                    <div className="tw-text-base">
                      Uppskattat värde av implementerade
                      <br />
                      förbättringar genom Bepp
                    </div>
                  </div>
                  <div className="tw-text-right">
                    <div className="tw-text-lg tw-font-medium">
                      {monthlyValue.toLocaleString()} kr / mån
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator Line */}
              <div className="tw-border-t tw-border-b-0 tw-border-solid tw-border-[#2F3338]"></div>

              {/* Total Profit Row */}
              <div className="tw-flex tw-flex-row tw-justify-between tw-items-start tw-pt-2 tw-text-[#e99529]">
                <div className="tw-flex-1">
                  <div className="tw-text-lg tw-font-medium">
                    Totalt ökad lönsamhet med Bepp
                  </div>
                </div>
                <div className="tw-text-left">
                  <div className="tw-text-xl tw-font-semibold">
                    {monthlyProfit.toLocaleString()} kr / mån
                  </div>
                  <div className="tw-text-xl tw-font-semibold">
                    {yearlyProfit.toLocaleString()} kr / år
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Explanation */}
          <div className="tw-flex tw-flex-row tw-items-start tw-space-x-3">
            <button
              onClick={() => setShowCalculation(!showCalculation)}
              className="tw-flex tw-flex-row tw-items-start tw-space-x-3 tw-cursor-pointer tw-rounded tw-bg-inherit tw-text-inherit tw-border-none"
            >
              <svg
                className={`tw-mt-1 tw-w-4 tw-h-4 tw-transition-transform tw-duration-200 ${
                  showCalculation ? "tw-rotate-90" : "tw-rotate-0"
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
              <span className="tw-text-base tw-select-none ">
                Såhär har vi räknat
              </span>
            </button>
          </div>

          {/* Calculation Details (conditionally shown) */}
          {showCalculation && (
            <div className="tw-mt-6 tw-p-4 tw-bg-gray-800 tw-rounded-lg">
              <div className="tw-space-y-4 tw-text-sm">
                <div>
                  <h5 className="tw-font-medium tw-text-[#e99529] tw-mb-2 tw-mt-0 tw-text-base">
                    1. Utan Bepp:
                  </h5>
                  <ul className="tw-space-y-1 tw-ml-4">
                    <li>
                      Varje anställd registrerar{" "}
                      <strong>0,1 incidenter per månad</strong>
                    </li>
                    <li>
                      <strong>20%</strong> av dessa incidenter leder till
                      förbättringsåtgärder
                    </li>
                    <li>
                      Varje åtgärd värderas till <strong>3 500 kr</strong>
                    </li>
                    <li>
                      Månadsvärde: {employeeCount} × 0,1 × 0,2 × 3 500 ={" "}
                      <strong>
                        {totalActionValueWithoutBepp.toLocaleString()} kr
                      </strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="tw-font-medium tw-text-[#e99529] tw-mb-2 tw-text-base">
                    2. Med Bepp:
                  </h5>
                  <ul className="tw-space-y-1 tw-ml-4">
                    <li>
                      Varje anställd registrerar{" "}
                      <strong>0,5 incidenter per månad</strong>
                    </li>
                    <li>
                      <strong>40%</strong> av dessa incidenter leder till
                      förbättringsåtgärder
                    </li>
                    <li>
                      Varje åtgärd värderas till <strong>3 500 kr</strong>
                    </li>
                    <li>
                      Månadsvärde: {employeeCount} × 0,5 × 0,4 × 3 500 ={" "}
                      <strong>
                        {totalActionValueWithBepp.toLocaleString()} kr
                      </strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="tw-font-medium tw-text-[#e99529] tw-mb-2 tw-text-base">
                    3. Beräkning av vinst:
                  </h5>
                  <ul className="tw-space-y-1 tw-ml-4">
                    <li>
                      Ökat värde per månad:{" "}
                      {totalActionValueWithBepp.toLocaleString()} -{" "}
                      {totalActionValueWithoutBepp.toLocaleString()} ={" "}
                      <strong>{monthlyValue.toLocaleString()} kr</strong>
                    </li>
                    <li>
                      Kostnad för Bepp:{" "}
                      <strong>{monthlyCost.toLocaleString()} kr/månad</strong>
                    </li>
                    <li>
                      Nettovinst per månad: {monthlyValue.toLocaleString()} -{" "}
                      {monthlyCost.toLocaleString()} ={" "}
                      <strong>{monthlyProfit.toLocaleString()} kr</strong>
                    </li>
                    <li>
                      Nettovinst per år: {monthlyProfit.toLocaleString()} × 12 ={" "}
                      <strong>{yearlyProfit.toLocaleString()} kr</strong>
                    </li>
                  </ul>
                </div>

                <div className="tw-bg-gray-700 tw-p-3 tw-rounded tw-mt-4">
                  <p className="tw-text-xs tw-text-gray-300 tw-m-0">
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
