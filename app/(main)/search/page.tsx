

import { getClasses } from "@/lib/api/classes";
import { getTrainers } from "@/lib/api/trainers";
import SearchContent from "@/components/ui/SearchBar";


export default async function SearchPage(){
    const [classes, trainers] = await Promise.all([
        getClasses().catch(() => []),
        getTrainers().catch(() => []),
    ])

    return (
        <main className="content-wrapper">
            <SearchContent classes={classes as any} trainers={trainers} />
        </main>
    );
}