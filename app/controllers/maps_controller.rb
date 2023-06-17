class MapsController < ApplicationController
  def search
    @maps = Map.all
    @map = Map.new
    require 'geocoder'
    require 'net/http'
    require 'json'
    require 'uri'

    latitude = params[:latitude]
    longitude = params[:longitude]

    base_url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    params = {
      'key' => '49d0fceee63728bd',
      'lat' => "#{latitude}",
      'lng' => "#{longitude}",
      'range' => 1,
      'count' => 5,
      'format' => 'json'
    }
    
    uri = URI.parse(base_url)
    uri.query = URI.encode_www_form(params)
    
    
    response = Net::HTTP.get_response(uri)
    if response.code == '301'
      # リダイレクト先のURLを取得
      new_location = response['Location']
      
      # 新しいURLにリクエストを送信
      new_uri = URI.parse(new_location)
      new_response = Net::HTTP.get_response(new_uri)
      if new_response.code == '200'
        # レスポンスを解析
        result = JSON.parse(new_response.body)
        # 結果を利用する処理を追加
      else
        # リクエストが成功しなかった場合の処理
        puts "Error: #{new_response.code} - #{new_response.body}"
      end
    else
      # 301以外のステータスコードの処理
      # ...
    end

    # @shop_name = result['results']['shop'].map { |shop| shop['name'] }

  end

  def get_nearby_shops
    
  end
  


  def create
    map = Map.new(map_params)
    if map.save
      redirect_to action: 'index'
    else
      redirect_to action: 'index'
    end
  end

  def destroy
    map = Map.find(params[:id])
    map.destroy
    redirect_to action: 'index'
  end



  private

  def map_params
    params.require(:map).permit(:address, :latitude, :longitude)
  end
end


