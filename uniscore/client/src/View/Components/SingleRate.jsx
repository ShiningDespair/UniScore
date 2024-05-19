import SRateCSS from './SingleRate.module.css';

function SingleRate (props){
    const rate = props.rate;
    return(
        <div class={SRateCSS.RateBody}>
            {/* Yorumcu İsmi(anonim mi?), beğen beğenme (satır sonu)
            Yıldızlar (2grid)
            Yorum */}
            <div class={SRateCSS.FirstRow}> 
                <p> {rate.com_id} </p>
                <div class={SRateCSS.LikeDislike}>
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                    <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                </div>

            </div> 

            <div> STARS </div>
            <div> {rate.com}</div>
            <div>
                
            </div>
        </div>
    )
}

export default SingleRate;