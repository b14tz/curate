import React, { useEffect, useState } from 'react'
import './css/ViewPlaylist.css'
import Box from '@mui/material/Box';
import { Button, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewList from '../components/View/ViewList';
import {useParams} from 'react-router-dom';
import { getSpotifyToken, fetchUserSpotifyID, topPlaylistInfo, fetchSpotifyPlaylist } from '../interfaces/spotifyInterface'
import { getClientToken } from '../interfaces/clientAuthInterface';
import { auth } from '../config/firebase';
import styled from 'styled-components';

import DownloadDialog from '../dialogs/DownloadDialog';

const AntiClippingTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;`

const AntiClippingButtonTypography = styled(Typography)`
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;`

export default function ViewTopPlaylist(props) {
    const { topId } = useParams()

    const [title, setTitle] = useState("")
    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")
    const [origin, setOrigin] = useState("")
    //const [playlistId, setPlaylistId] = useState("")
    const [numTracks, setNumTracks] = useState(0)
    const [isrcList, setIsrcList] = useState([])
    const [spToken, setSpToken] = useState("")
    const [spotifyId, setSpotifyId] = useState("")
    // const [appleId, setAppleId] = useState("")
    const [dialog, setDialog] = useState(false)
    const [clientToken, setClientToken] = useState("")

    useEffect(() => {
        //gets and sets all post data
        let ignore = false
        getClientToken().then((token) => {
            setClientToken(token)
            topPlaylistInfo(token, topId).then(data => {
                if (!ignore) {
                    setTitle(data.name)
                    setDescription(data.description)
                    setUsername(data.owner.display_name)
                    setOrigin('spotify')
                    //setPlaylistId(data.id)
                    setNumTracks(data.tracks.total)

                    getSpotifyToken(auth.currentUser.uid).then((token2) => {
                        setSpToken(token2)
                    })

                    fetchSpotifyPlaylist(token, topId).then((songData) => {
                        let isrcs =[]
                        //console.log("spData: ", songData)
                        for(let i=0; i<songData.length; i++) {
                            for(let j=0; j<songData[i].items.length; j+=1){
                                //console.log(spData.tracks.items[i].track)
                                isrcs.push(songData[i].items[j].track.external_ids.isrc)
                            }
                        }
                        setIsrcList(isrcs)
                    })

                    fetchUserSpotifyID(spToken).then(id => {
                        setSpotifyId(id)
                    })
                }
            })
        
        })
        return () => {
            ignore = true;
        }
    }, [topId, spToken])

  return (
        <Box sx={{margin:"auto", width:"80%"}}>
            <AntiClippingTypography variant="header" sx={{fontSize:"4rem"}}>{title}</AntiClippingTypography>
            <AntiClippingTypography variant="h4">{description}</AntiClippingTypography>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"baseline"}}>
                <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", mt:"20px"}}>
                    <Button variant="contained" sx={{mr:"20px"}}>
                        <AntiClippingButtonTypography onClick={() => setDialog(true)}>Save to Library</AntiClippingButtonTypography>
                    </Button>
                    <Typography variant="h5">{numTracks} Songs</Typography>
                </Box>

                <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <AccountCircleIcon/>
                    <Typography color="primary.main" variant='h5'>{username}</Typography>
                </Box>
            </Box>

            <ViewList type="playlist" isrcs={isrcList} spotifyToken={clientToken} origin={origin}/>

            <DownloadDialog dialog={dialog} setDialog={setDialog} spotifyId={spotifyId} isrcList={isrcList} spToken={spToken} title={title} description={description} />
        </Box>
  )
}