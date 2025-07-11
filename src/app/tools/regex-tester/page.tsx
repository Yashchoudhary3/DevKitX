import RegexTester from '../../../components/RegexTester';

export default function RegexTesterPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-blue-200 text-sm mb-2">Test and debug regular expressions. See live matches, explanations, and save/load your favorite regexes.</div>
      <RegexTester />
    </div>
  );
} 