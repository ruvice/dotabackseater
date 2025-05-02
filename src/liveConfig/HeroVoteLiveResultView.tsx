import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Hero, HeroVoteMap, Item } from '../models/models'
import { RootState } from '../store'
import LazyImage from '../components/vote/voteMenu/LazyImage'
import { AnimatePresence, motion } from "framer-motion";
import "./HeroVoteLiveResultView.css"

interface HeroVote {
    hero: Hero,
    voteCount: number
}
interface MinimizedViewProps {
    heroVotesArr: HeroVote[]
}
const MaximisedView = (props: MinimizedViewProps) => {
    
    const {heroVotesArr} = props
    
    return (
    <>
        <div className='maximised-hero-no-vote'>
            {heroVotesArr.length === 0 && <p className='text-dota-text-white'>No votes in yet!</p>}
        </div>
        {heroVotesArr.length > 0 &&
            <div className="maximised-grid-container bg-dota-panel-item-box">
                {heroVotesArr.slice(0, 6).map((heroVote: HeroVote) => (
                    <motion.div 
                        key={heroVote.hero.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        layout
                        className="maximised-grid-item bg-dota-panel-item-box-active"
                    >
                        <div className="maximised-hero-vote-result-item grid-cols-[30px_300px_1fr]">
                            <LazyImage imageName={heroVote.hero.hero_name + "_icon"} height={24} width={24}/>
                            <p className='text-dota-text-white text-xs ml-2'>{heroVote.hero.name}</p>
                            <p className='text-dota-text-white text-xs ml-2'>{heroVote.voteCount}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        }
    </>
)}

const HeroVoteLiveResultView = () => {
    const [heroVoteArr, setHeroVoteArr] = useState<HeroVote[]>([])
    const heroVoteMap = useSelector((state: RootState) => state.event.heroVoteMap)
    const heroes = useSelector((state: RootState) => state.hero.heroes)
    const hasActiveSession = useSelector((state: RootState) => state.vote.hasActiveHeroVoteSession)
    useEffect(() => {
        if (heroVoteMap != undefined && heroes != undefined) {
            const newHeroVoteArr = Object.entries(heroVoteMap)
                                        .sort((a, b) => b[1] - a[1]) // ✅ Sort by value (votes) descending
                                        .map(([heroId, votes]) => ({hero: heroes[heroId], voteCount: votes}))
            setHeroVoteArr(newHeroVoteArr)
        } else {
            setHeroVoteArr([])
        }
    }, [JSON.stringify(heroVoteMap), heroes])
    return (
        <div className="maximised-hero-list bg-dota-panel-item-box rounded-lg mt-1 p-2">
            <p className='text-dota-text-white text-lg font-bold ml-2'>{hasActiveSession ? 'Voting Active' : 'Voting Ended'}</p>
            <MaximisedView heroVotesArr={heroVoteArr} />
        </div>
  )
}

export default HeroVoteLiveResultView