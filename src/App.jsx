import { useSelector, useDispatch } from 'react-redux';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import '@bryntum/schedulerpro/schedulerpro.css';
import '@bryntum/schedulerpro/stockholm-light.css';
import { setFilterText } from './store/schedulerSlice';
import { useRef } from 'react';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const { resources, events, filterText } = useSelector((s) => s.scheduler);
    const schedulerRef = useRef();

    const schedulerConfig = {
        startDate: '2026-03-23',
        endDate: '2026-03-29',
        viewPreset: 'dayAndWeek',
        columns: [
            { type: 'tree', text: 'Resource', field: 'name', width: 200 },
        ],
    };

    return (
        <div id="app">
            <header>
                <h2>Bryntum Scheduler Pro — Redux Tree Filter Demo</h2>
                <p className="hint">
                    Type a name below to filter resources via Redux state.
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
                    {filterText && (
                        <span className="match-count">
                            {resources.length === 0
                                ? 'No matches'
                                : `${resources.length} resource(s) shown`}
                        </span>
                    )}
                </div>
            </header>

            <BryntumSchedulerPro
                ref={schedulerRef}
                {...schedulerConfig}
                resources={resources}
                events={events}
                groupFeature={false}
                treeFeature={{ tree: true, expandOnCellClick: false }}
                treeGroupFeature={{ levels: ['team'], expandParents: false }}
            />
        </div>
    );
}

export default App;
