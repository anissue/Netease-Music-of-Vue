const manager = {
    handleSong(song) {
        let recSong = {
            id: song.id,
            album: song.al,
            name: song.name,
            artist: song.ar,
        }
        return recSong;
    },
    unique(arr) {
        let unique = {};
        arr.forEach(function(item) {
            unique[JSON.stringify(item)] = item; //键名不会重复
        })
        var arr = Object.keys(unique).map(function(u) {
            //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
            return JSON.parse(u);
        });
        return arr;
    },
    setLocalList(list) {
        let localList = JSON.stringify(list);
        localStorage.setItem('localList', localList);
    },
    setLocalSongs(songs) {
        let localSongs = JSON.stringify(songs);
        localStorage.setItem('localSongs', localSongs);
    },
}

export default manager;