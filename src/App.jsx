import { useSelector, useDispatch } from 'react-redux';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import '@bryntum/schedulerpro/schedulerpro.css';
import '@bryntum/schedulerpro/stockholm-light.css';
import { setFilterText, allResources, allEvents } from './store/schedulerSlice';
import { useRef, useEffect } from 'react';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const filterText = useSelector((s) => s.scheduler.filterText);
    const schedulerRef = useRef();

    const schedulerConfig = {
        startDate: '2026-03-23',
        endDate: '2026-03-29',
        viewPreset: 'dayAndWeek',
        columns: [
            { type: 'tree', text: 'Resource', field: 'name', width: 200 },
        ],
    };

    useEffect(() => {
        const scheduler = schedulerRef.current?.instance;
        if (!scheduler) return;

        if (filterText.trim() === '') {
            scheduler.resourceStore.clearFilters();
        } else {
            const term = filterText.toLowerCase();
            scheduler.resourceStore.filter({
                id: 'nameFilter',
                filterBy: (resource) => resource.name.toLowerCase().includes(term),
            });
        }
    }, [filterText]);

    return (
        <div id="app">
            <header>
                <h2>Bryntum Scheduler Pro — Redux Tree Filter Demo</h2>
                <p className="hint">
                    Type a name below to filter resources. Redux owns the filter
                    criteria; Bryntum's resourceStore.filter() handles visibility.
                </p>
                <div className="filter-bar">
                    <label htmlFor="filter-input">Filter resources:</label>
                    <input
                        id="filter-input"
                        type="text"
                        placeholder="e.g. Alice, Backend…"
                        value={filterText}
                        onChange={(e) => dispatch(setFilterText(e.target.value))}
                    />
                </div>
            </header>

            <BryntumSchedulerPro
                ref={schedulerRef}
                {...schedulerConfig}
                resources={allResources}
                events={allEvents}
                groupFeature={false}
                treeFeature={{ tree: true, expandOnCellClick: false }}
                treeGroupFeature={{ levels: ['team'], expandParents: false }}
            />
        </div>
    );
}

export default App;
