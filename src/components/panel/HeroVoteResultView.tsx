import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Hero, HeroVoteMap, Item } from '../../models/models'
import { RootState } from '../../store/store'
import LazyImage from '../vote/voteMenu/LazyImage'
import { AnimatePresence, motion } from "framer-motion";
import "./HeroVoteResultView.css"

interface HeroVote {
    hero: Hero,
    voteCount: number
}
interface MinimizedViewProps {
    heroVotesArr: HeroVote[]
}
const MinimizedView = (props: MinimizedViewProps) => {
    
    const {heroVotesArr} = props
    
    return (
    <>
        <div className='minimised-hero-no-vote'>
            {heroVotesArr.length === 0 && <p className='text-dota-text-white'>No votes in yet!</p>}
        </div>
        {heroVotesArr.length > 0 &&
            <div className="grid-container">
                {heroVotesArr.slice(0, 6).map((heroVote: HeroVote, index) => (
                    // <AnimatePresence mode="wait">
                        <motion.div 
                            key={heroVote.hero.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 200 }}
                            layout
                            className="grid-item bg-dota-panel-item-box-active"
                        >
                            <LazyImage imageName={heroVote.hero.hero_name + "_icon"} height={24} width={24}/> <p className='text-dota-text-white text-xs ml-2'>{heroVote.voteCount}</p>
                        </motion.div>
                    // </AnimatePresence>
                ))}
            </div>
        }
    </>
)}

const HeroVoteResultView = () => {
    const [heroVoteArr, setHeroVoteArr] = useState<HeroVote[]>([])
    const heroVoteMap = useSelector((state: RootState) => state.event.heroVoteMap)
    const heroes = useSelector((state: RootState) => state.hero.heroes)
    const [isMinimised, setIsMinimised] = useState<boolean>(true)
    console.log(heroVoteArr.slice(0,6))
    useEffect(() => {
        if (heroVoteMap != undefined) {
            const newHeroVoteArr =  Object.entries(heroVoteMap)
                                        .sort((a, b) => b[1] - a[1]) // ✅ Sort by value (votes) descending
                                        .map(([heroId, votes]) => ({hero: heroes[heroId], voteCount: votes}))
            setHeroVoteArr(newHeroVoteArr)
        } else {
            setHeroVoteArr([])
        }
    }, [JSON.stringify(heroVoteMap)])
    return (
        <div className="minimised-hero-list flex flex-col rounded-lg mt-1 p-2">
            <div className="h-[60px]">
                <MinimizedView heroVotesArr={heroVoteArr} />
                {/* <div className='minimised-hero-no-vote'>
                    {heroVoteArr.length === 0 && <p className='text-dota-text-white'>No votes in yet!</p>}
                </div>
                {heroVoteArr.length > 0 &&
                    <div className="grid-container">
                        {heroVoteArr.slice(0, 6).map((heroVote: HeroVote, index) => (
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={heroVote.hero.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="grid-item bg-dota-panel-item-box-active"
                                >
                                    <LazyImage imageName={heroVote.hero.hero_name + "_icon"} height={24} width={24}/> <p className='text-dota-text-white text-xs ml-2'>{heroVote.voteCount}</p>
                                </motion.div>
                            </AnimatePresence>
                        ))}
                    </div>
                } */}
            </div>
        </div>
  )
}

export default HeroVoteResultView