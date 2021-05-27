import {mapGetters,mapMutations,mapActions} from 'vuex'
//歌曲列表
export default listMinix = {
  computed:{
    ...mapGetters(["playing","currentMusic"])
  },
  methods:{
    // selectItem(item, index) {
    //   if (item.id === this.currentMusic.id && this.playing){
    //     this.setPlaying(false)
    //   } else {
    //     this.selectPlay({
    //       list:this.list,
    //       index
    //     })
    //   }
    // },
    ...mapMutations({
      setPlaying:"setPlaying"
    }),
    ...mapActions(['selectPlay'])
  },
}
