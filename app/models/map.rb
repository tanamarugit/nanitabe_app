class Map < ApplicationRecord
  geocoded_by :address
  after_validation :geocode

  def current_position
    #現在地を返す
  end

  def address
    [street, city, state, country].compact.join(', ')
  end

end
