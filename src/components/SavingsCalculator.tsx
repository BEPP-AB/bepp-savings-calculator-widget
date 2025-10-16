import { useState } from "react";

const MIN_EMPLOYEE_COUNT = 5;
const MAX_EMPLOYEE_COUNT = 125;
const DEFAULT_EMPLOYEE_COUNT = 30;

const REGISTERED_INCIDENTS_PER_EMPLOYEE_PER_MONTH_WITHOUT_BEPP = 0.1;
const REGISTERED_INCIDENTS_PER_EMPLOYEE_PER_MONTH_WITH_BEPP = 0.5;

const RATIO_OF_INCIDENTS_THAT_LEAD_TO_ACTION_WITHOUT_BEPP = 0.2;
const RATIO_OF_INCIDENTS_THAT_LEAD_TO_ACTION_WITH_BEPP = 0.4;

const VALUE_OF_ACTION_WITHOUT_BEPP = 2000; // SEK
const VALUE_OF_ACTION_WITH_BEPP = 5000; // SEK

const SavingsCalculator = () => {
  const [employeeCount, setEmployeeCount] = useState(DEFAULT_EMPLOYEE_COUNT);
  const [showCalculation, setShowCalculation] = useState(false);

  const totalActionValueWithoutBepp =
    employeeCount *
    REGISTERED_INCIDENTS_PER_EMPLOYEE_PER_MONTH_WITHOUT_BEPP *
    RATIO_OF_INCIDENTS_THAT_LEAD_TO_ACTION_WITHOUT_BEPP *
    VALUE_OF_ACTION_WITHOUT_BEPP;

  const totalActionValueWithBepp =
    employeeCount *
    REGISTERED_INCIDENTS_PER_EMPLOYEE_PER_MONTH_WITH_BEPP *
    RATIO_OF_INCIDENTS_THAT_LEAD_TO_ACTION_WITH_BEPP *
    VALUE_OF_ACTION_WITH_BEPP;

  const monthlyValue = totalActionValueWithBepp - totalActionValueWithoutBepp;
  const yearlyValue = monthlyValue * 12;

  const isOverMaxEmployees = employeeCount > MAX_EMPLOYEE_COUNT;

  return (
    <div className="tw-p-8 tw-max-w-2xl tw-text-white tw-rounded-3xl tw-border tw-border-solid tw-border-[#2F3338] tw-mx-auto tw-bg-[#ffffff05]">
      {/* Header */}
      <div className="tw-text-center tw-mb-4">
        <h1 className="tw-text-2xl tw-font-bold tw-m-0 tw-text-[#e99529]">
          {isOverMaxEmployees ? "x" : yearlyValue.toLocaleString()} kr / år
        </h1>
        <p className="tw-text-sm tw-text-gray-300 tw-mt-0">
          uppskattat ökat värde med Bepp
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
            <div className="tw-space-y-6">
              {/* Total Value Row */}
              <div className="tw-flex tw-flex-row tw-justify-between tw-items-start tw-text-[#e99529]">
                <div className="tw-flex-1">
                  <div className="tw-text-lg tw-font-medium">
                    Uppskattat ökat värde med Bepp
                  </div>
                </div>
                <div className="tw-text-left">
                  <div className="tw-text-xl tw-font-semibold">
                    {monthlyValue.toLocaleString()} kr / mån
                  </div>
                  <div className="tw-text-xl tw-font-semibold">
                    {yearlyValue.toLocaleString()} kr / år
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
                      Varje åtgärd värderas till <strong>2 000 kr</strong>
                    </li>
                    <li>
                      Månadsvärde: {employeeCount} anställda × 0,1 incidenter
                      per månad × 0,2 incidenter som leder till åtgärder × 2 000
                      kr per åtgärd ={" "}
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
                      Varje åtgärd värderas till <strong>5 000 kr</strong>
                    </li>
                    <li>
                      Månadsvärde: {employeeCount} anställda × 0,5 incidenter
                      per månad × 0,4 incidenter som leder till åtgärder × 5 000
                      kr per åtgärd ={" "}
                      <strong>
                        {totalActionValueWithBepp.toLocaleString()} kr
                      </strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="tw-font-medium tw-text-[#e99529] tw-mb-2 tw-text-base">
                    3. Beräkning av ökat värde:
                  </h5>
                  <ul className="tw-space-y-1 tw-ml-4">
                    <li>
                      Ökat värde per månad:{" "}
                      {totalActionValueWithBepp.toLocaleString()} -{" "}
                      {totalActionValueWithoutBepp.toLocaleString()} ={" "}
                      <strong>{monthlyValue.toLocaleString()} kr</strong>
                    </li>
                    <li>
                      Ökat värde per år: {monthlyValue.toLocaleString()} × 12 ={" "}
                      <strong>{yearlyValue.toLocaleString()} kr</strong>
                    </li>
                  </ul>
                </div>

                <div className="tw-bg-gray-700 tw-p-3 tw-rounded tw-mt-4">
                  <p className="tw-text-xs tw-text-gray-300 tw-m-0 tw-mb-2">
                    <strong>Antaganden:</strong> Beräkningen baseras på tre sätt
                    som Bepp förbättrar ert systematiska arbete:
                  </p>
                  <ul className="tw-text-xs tw-text-gray-300 tw-mt-0 tw-mb-0 tw-ml-4 tw-space-y-1">
                    <li className="tw-text-xs">
                      <strong>
                        Fler incidenter rapporteras (0,1 → 0,5 per
                        anställd/månad):
                      </strong>{" "}
                      Bepps användarvänliga app och låga tröskel gör det enkelt
                      för anställda att rapportera tillbud och observationer
                      direkt när de uppstår.
                    </li>
                    <li className="tw-text-xs">
                      <strong>
                        Högre andel leder till åtgärder (20% → 40%):
                      </strong>{" "}
                      Med Bepps strukturerade uppföljning och tydliga
                      ärendehantering blir fler rapporter omvandlade till
                      konkreta förbättringsåtgärder istället för att hamna i
                      glömska.
                    </li>
                    <li className="tw-text-xs">
                      <strong>
                        Högre värde per åtgärd (2 000 kr → 5 000 kr):
                      </strong>{" "}
                      Bepps dataanalys och trendrapporter hjälper er att
                      identifiera grundorsaker och prioritera rätt åtgärder,
                      vilket leder till mer strategiska och värdefulla
                      förbättringar jämfört med andra lösningar.
                    </li>
                  </ul>
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
