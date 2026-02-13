import ProgressBar from "./components/progress-bar";
import Progress from "./components/Progress";
import Inout from "./components/Inout_dashboard";
import Inout2 from "./components/Inout2_dashboard";
import AgeProgressChart from "./components/AgeProgress";
export default function App() {
  return (
    <>
      <div className="min-h-screen flex justify-center py-4">
        <div className="space-y-4 w-[80vw] bg-white p-6 rounded-xl shadow-md">
          <p className="text-4xl font-semibold text-slate-800 text-[#fe5000]">
            โครงการเก็บรวบรวมข้อมูลเชิงปริมาณเพื่อประเมินการรับรู้และการยอมรับของสังคมต่อบทบาทสื่อสาธารณะของ
            ส.ส.ท.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProgressBar
              heading="ภาพรวมการเก็บข้อมูล"
              value={2936}
              total={5010}
            />
            <ProgressBar
              heading="จำนวนการเก็บข้อมูลเพศชาย"
              value={1380}
              total={2936}
            />
            <ProgressBar
              heading="จำนวนการเก็บข้อมูลเพศหญิง"
              value={1556}
              total={2936}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
            <Inout inArea={1861} outArea={1085} />
            <Inout2 inArea={1541} outArea={1405} />
            <AgeProgressChart
              data={[
                { age: "รวมทั้งหมด", Quota: 5010, Success: 2936 },
                { age: "15-24", Quota: 820, Success: 460 },
                { age: "25-34", Quota: 910, Success: 530 },
                { age: "35-44", Quota: 870, Success: 510 },
                { age: "45-54", Quota: 820, Success: 470 },
                { age: "55-64", Quota: 780, Success: 430 },
                { age: "65+", Quota: 810, Success: 536 },
              ]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Progress />
          </div>
        </div>
      </div>
    </>
  );
}
